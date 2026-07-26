import type { AuthProvider } from './auth.js';
import {
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  PaymentRequiredError,
  RateLimitError,
  ScalePadError,
  ServerError,
  ValidationError,
} from './errors.js';
import type { RateLimiter } from './rate-limiter.js';

export interface HttpClientConfig {
  baseUrl: string;
  rateLimiter: RateLimiter;
  /** Omit for unauthenticated endpoints (e.g. Quoter token minting). */
  auth?: AuthProvider;
  /** Max retries for network errors, 429s, and 5xx responses (default 3). */
  maxRetries?: number;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, unknown>;
  body?: unknown;
}

/**
 * Native-fetch HTTP client shared by every resource.
 *
 * - Acquires a rate-limiter token before every attempt.
 * - Retries network errors and 5xx with exponential backoff
 *   (min(1000 * 2^(attempt-1), 30s)); 429 honors Retry-After.
 * - On 401, asks the AuthProvider to refresh credentials and retries once
 *   (Quoter OAuth); API-key 401s are terminal.
 * - Error bodies are read as text FIRST, then JSON.parse'd in a try/catch, so
 *   non-JSON error pages never crash the client.
 */
export class HttpClient {
  private readonly baseUrl: string;
  private readonly rateLimiter: RateLimiter;
  private readonly auth: AuthProvider | undefined;
  private readonly maxRetries: number;

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/+$/, '');
    this.rateLimiter = config.rateLimiter;
    this.auth = config.auth;
    this.maxRetries = config.maxRetries ?? 3;
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', params, body } = options;

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    let url = `${this.baseUrl}${normalizedPath}`;
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            for (const v of value) searchParams.append(`${key}[]`, String(v));
          } else {
            searchParams.set(key, String(value));
          }
        }
      }
      const qs = searchParams.toString();
      if (qs) url += `?${qs}`;
    }

    let attemptedAuthRefresh = false;
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      if (attempt > 0) {
        const delay = Math.min(1000 * 2 ** (attempt - 1), 30_000);
        await new Promise((r) => setTimeout(r, delay));
      }

      await this.rateLimiter.acquire();

      const headers: Record<string, string> = {
        Accept: 'application/json',
        ...(this.auth ? await this.auth.headers() : {}),
      };
      if (body !== undefined) headers['Content-Type'] = 'application/json';

      let response: Response;
      try {
        response = await fetch(url, {
          method,
          headers,
          body: body !== undefined ? JSON.stringify(body) : undefined,
        });
      } catch (err) {
        lastError = err as Error;
        continue;
      }

      if (response.ok) {
        if (response.status === 204) return {} as T;
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/json')) {
          return (await response.json()) as T;
        }
        // Lifecycle Manager export endpoints return CSV (text) and PDF/XLSX
        // (binary) bodies — hand them back rather than discarding them.
        if (contentType.startsWith('text/')) return (await response.text()) as T;
        return (await response.arrayBuffer()) as T;
      }

      // Read the error body safely (text first, then parse).
      let responseBody: unknown;
      const rawText = await response.text();
      try {
        responseBody = JSON.parse(rawText);
      } catch {
        responseBody = rawText;
      }

      switch (response.status) {
        case 400:
          throw new ValidationError('Bad request', [], responseBody);
        case 401: {
          const error = new AuthenticationError('Authentication failed', responseBody);
          if (!attemptedAuthRefresh && this.auth?.handleUnauthorized) {
            attemptedAuthRefresh = true;
            let refreshed = false;
            try {
              refreshed = await this.auth.handleUnauthorized();
            } catch {
              refreshed = false;
            }
            if (refreshed) {
              lastError = error;
              continue;
            }
          }
          throw error;
        }
        case 402:
          throw new PaymentRequiredError(
            'Active ScalePad product subscription required for this endpoint',
            responseBody
          );
        case 403:
          throw new ForbiddenError('Forbidden', responseBody);
        case 404:
          throw new NotFoundError('Resource not found', responseBody);
        case 429: {
          const retryAfter = parseInt(response.headers.get('retry-after') || '5', 10);
          if (attempt < this.maxRetries) {
            await new Promise((r) => setTimeout(r, retryAfter * 1000));
            continue;
          }
          throw new RateLimitError('Rate limit exceeded', retryAfter, responseBody);
        }
        default:
          if (response.status >= 500) {
            lastError = new ServerError(`Server error: ${response.status}`, responseBody);
            if (attempt < this.maxRetries) continue;
            throw lastError;
          }
          throw new ScalePadError(`HTTP ${response.status}`, response.status, responseBody);
      }
    }

    throw lastError || new Error('Request failed after retries');
  }
}
