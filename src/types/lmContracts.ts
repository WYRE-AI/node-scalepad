/**
 * Types for the Lifecycle Manager contracts (agreements) surface.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmContract {
  id: string;
  name?: string;
  expiry_status?: string;
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface LmContractListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[expiry_status]'?: string;
}

export interface LmContractCreatePayload {
  client_key: string;
  create_payload: Record<string, unknown>;
}

export interface LmContractUpdatePayload {
  client_id?: string;
  update_payload: Record<string, unknown>;
}

export interface LmContractAssetsPayload {
  hardware_keys: string[];
}
