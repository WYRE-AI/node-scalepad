import type { HttpClient } from '../http.js';
import type {
  QuoterAuthorizeRequest,
  QuoterRefreshRequest,
  QuoterTokenPair,
} from '../types/quoterAuth.js';

/**
 * Standalone api.quoter.com OAuth token endpoints. These exist only on
 * api.quoter.com — they are unauthenticated (credentials travel in the body),
 * so this resource is constructed with the unauthenticated Quoter HttpClient.
 *
 * Most callers never need this directly: supplying `quoterClientId` +
 * `quoterClientSecret` on the client config makes the SDK mint and refresh
 * tokens automatically (see QuoterOAuth in auth.ts).
 */
export class QuoterAuthResource {
  constructor(private readonly http: HttpClient) {}

  /** Exchange OAuth client credentials for a token pair — POST /v1/auth/oauth/authorize */
  async authorize(body: QuoterAuthorizeRequest): Promise<QuoterTokenPair> {
    return this.http.request('/v1/auth/oauth/authorize', {
      method: 'POST',
      body: { grant_type: 'client_credentials', ...body },
    });
  }

  /** Exchange a refresh token for a new token pair — POST /v1/auth/refresh */
  async refresh(body: QuoterRefreshRequest): Promise<QuoterTokenPair> {
    return this.http.request('/v1/auth/refresh', { method: 'POST', body });
  }
}
