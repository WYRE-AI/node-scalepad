/** Data-residency regions offered by ScalePad. */
export type ScalePadRegion = 'us' | 'eu' | 'ca' | 'au';

export const DEFAULT_BASE_URL = 'https://api.scalepad.com';
export const DEFAULT_QUOTER_BASE_URL = 'https://api.quoter.com';

export interface ScalePadClientConfig {
  /**
   * ScalePad platform API key (generated in the ScalePad app by an
   * Administrator). Sent as the x-api-key header. One key covers Core,
   * Lifecycle Manager, ControlMap, Backup Radar, and the hosted Quoter API —
   * product endpoints return 402 if the subscription is missing.
   */
  apiKey: string;
  /**
   * Data-residency region (default 'us'). Selects the regional base URL for
   * ControlMap (us/eu/ca/au) and Backup Radar (us/eu); Core and Lifecycle
   * Manager are US-only.
   */
  region?: ScalePadRegion;
  /**
   * Optional Quoter OAuth client ID. Only needed to hit the standalone
   * api.quoter.com API directly (OAuth2 client_credentials). When omitted,
   * Quoter resources use the ScalePad-hosted path with the ScalePad key.
   */
  quoterClientId?: string;
  /** Optional Quoter OAuth client secret, paired with quoterClientId. */
  quoterClientSecret?: string;
  /** Override for the ScalePad platform base URL (default https://api.scalepad.com). */
  baseUrl?: string;
  /** Override for the standalone Quoter base URL (default https://api.quoter.com). */
  quoterBaseUrl?: string;
  /** Max retries for network errors, 429s, and 5xx responses (default 3). */
  maxRetries?: number;
  /** Token-bucket override. Defaults to ScalePad's 50 requests / 5 seconds. */
  rateLimit?: { maxRequests?: number; windowMs?: number };
}

/**
 * Resolve the regional base URL used by ControlMap (us/eu/ca/au) and
 * Backup Radar (us/eu). Regional hosts follow the
 * `https://<region>.api.scalepad.com` pattern; 'us' is the bare default host.
 * An explicit baseUrl override always wins over region derivation.
 */
export function resolveRegionalBaseUrl(
  region: ScalePadRegion = 'us',
  baseUrl: string = DEFAULT_BASE_URL
): string {
  if (baseUrl !== DEFAULT_BASE_URL) return baseUrl;
  return region === 'us' ? DEFAULT_BASE_URL : `https://${region}.api.scalepad.com`;
}
