import { DEFAULT_QUOTER_BASE_URL } from './config.js';
import { AuthenticationError } from './errors.js';

/** Supplies auth headers for the HttpClient and (optionally) handles 401s. */
export interface AuthProvider {
  /** Headers to attach to every request. */
  headers(): Promise<Record<string, string>>;
  /**
   * Called at most once per request when the API returns 401. Return true if
   * credentials were refreshed and the request should be retried once.
   */
  handleUnauthorized?(): Promise<boolean>;
}

/**
 * ScalePad platform auth: a single x-api-key header. Covers Core, Lifecycle
 * Manager, ControlMap, Backup Radar, and the ScalePad-hosted Quoter API.
 * A 401 with an API key is terminal — there is nothing to refresh.
 */
export class ApiKeyAuth implements AuthProvider {
  constructor(private readonly apiKey: string) {}

  async headers(): Promise<Record<string, string>> {
    return { 'x-api-key': this.apiKey };
  }
}

export interface QuoterOAuthConfig {
  /** Quoter OAuth client ID (Quoter Account > API Keys, Account Owner only). */
  clientId: string;
  /** Quoter OAuth client secret. */
  clientSecret: string;
  /** Base URL of the standalone Quoter API (default https://api.quoter.com). */
  baseUrl?: string;
}

interface QuoterTokenResponse {
  access_token: string;
  refresh_token?: string;
}

/**
 * Standalone Quoter API auth (api.quoter.com): OAuth2 client_credentials.
 *
 * POST /v1/auth/oauth/authorize mints an access_token with a 1-hour TTL and a
 * refresh_token; POST /v1/auth/refresh renews it. Tokens are fetched lazily on
 * the first request. When the API returns 401 the HttpClient asks this
 * provider to refresh (falling back to a fresh authorize) and retries the
 * request once.
 */
export class QuoterOAuth implements AuthProvider {
  private readonly baseUrl: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private readonly config: QuoterOAuthConfig) {
    this.baseUrl = (config.baseUrl ?? DEFAULT_QUOTER_BASE_URL).replace(/\/+$/, '');
  }

  async headers(): Promise<Record<string, string>> {
    if (!this.accessToken) await this.authorize();
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  async handleUnauthorized(): Promise<boolean> {
    try {
      await this.refresh();
      return true;
    } catch {
      // Refresh token expired or absent — fall back to a fresh authorize.
      try {
        await this.authorize();
        return true;
      } catch {
        return false;
      }
    }
  }

  private async authorize(): Promise<void> {
    const data = await this.tokenRequest('/v1/auth/oauth/authorize', {
      client_id: this.config.clientId,
      secret: this.config.clientSecret,
      grant_type: 'client_credentials',
    });
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token ?? null;
  }

  private async refresh(): Promise<void> {
    if (!this.refreshToken) {
      throw new AuthenticationError('No Quoter refresh token available', null);
    }
    const data = await this.tokenRequest('/v1/auth/refresh', {
      refresh_token: this.refreshToken,
    });
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token ?? this.refreshToken;
  }

  private async tokenRequest(
    path: string,
    body: Record<string, string>
  ): Promise<QuoterTokenResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });

    // Read the body safely: text first, then JSON.parse.
    const rawText = await response.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = rawText;
    }

    if (!response.ok) {
      throw new AuthenticationError(
        `Quoter token request failed: HTTP ${response.status}`,
        parsed
      );
    }
    const data = parsed as Partial<QuoterTokenResponse>;
    if (!data.access_token) {
      throw new AuthenticationError('Quoter token response missing access_token', parsed);
    }
    return data as QuoterTokenResponse;
  }
}
