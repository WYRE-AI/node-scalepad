/**
 * Types for the standalone api.quoter.com OAuth token endpoints. These
 * endpoints exist only on api.quoter.com (not the ScalePad-hosted path) and
 * are themselves unauthenticated — the credentials travel in the body.
 */

export interface QuoterAuthorizeRequest {
  /** Quoter OAuth client ID (Quoter Account > API Keys, Account Owner only). */
  client_id: string;
  /** Quoter OAuth client secret. */
  secret: string;
  /** Defaults to 'client_credentials'. */
  grant_type?: string;
}

export interface QuoterRefreshRequest {
  refresh_token: string;
}

/** Access/refresh token pair minted by the Quoter OAuth endpoints. */
export interface QuoterTokenPair {
  /** Bearer access token, 1-hour TTL. */
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  [key: string]: unknown;
}
