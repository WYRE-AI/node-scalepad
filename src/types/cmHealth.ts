import type { CursorPaginationParams } from '../pagination.js';

/**
 * Shared POST-search request body used by every ControlMap search endpoint
 * (reports, risks, controls, evidences, policies, objectives, questions, ...).
 */
export interface CmSearchRequest {
  /** Column filters, e.g. `{ status: 'open' }`. */
  filter?: Record<string, unknown>;
  /** Fields to include in the response. */
  fields?: string[];
  page_size?: number;
  cursor?: string;
  sort?: string;
}

/**
 * Query params shared by the cross-client summary/overview listings.
 * Individual endpoints accept a subset of these filters.
 */
export interface CmSummaryListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[client.tenant_id]'?: string;
  'filter[client.name]'?: string;
  sort?: string;
}

/** Envelope returned by non-paginated ControlMap list endpoints. */
export interface CmListResponse<T> {
  data: T[];
  [key: string]: unknown;
}

/** Reference to the ControlMap client an entity belongs to. */
export interface CmClientRef {
  id?: string;
  tenant_id?: string;
  name?: string;
  [key: string]: unknown;
}

/** Signed URL for downloading a report or document. */
export interface CmSignedUrl {
  url?: string;
  expires_at?: string;
  [key: string]: unknown;
}

/** Body for the signed-URL generation endpoints (evidence and action items). */
export interface CmSignedUrlRequest {
  file_name: string;
  file_size_bytes: number;
}

/**
 * Body for the direct multipart document-upload endpoints. The API accepts
 * multipart uploads up to 10 MB; prefer the signed-URL flow for SDK use.
 */
export interface CmDocumentUploadRequest {
  file: unknown;
}

/** An uploaded ControlMap document. */
export interface CmDocument {
  id: string;
  file_name?: string;
  [key: string]: unknown;
}

/** Compliance health metrics for a ControlMap client. */
export interface CmClientHealth {
  client?: CmClientRef;
  [key: string]: unknown;
}

/** A generated ControlMap client report. */
export interface CmClientReport {
  id: string;
  name?: string;
  created_at?: string;
  [key: string]: unknown;
}

/** Query params for listing compliance health metrics across clients. */
export interface CmHealthListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[client.tenant_id]'?: string;
  'filter[client.name]'?: string;
  fields?: string;
  sort?: string;
}
