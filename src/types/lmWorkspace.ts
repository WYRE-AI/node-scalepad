/**
 * Types for the Lifecycle Manager workspace surface: user identity, PSA
 * create-fields, opportunities, notes, UI states, insights, and SaaS
 * management.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmUserIdentity {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

export interface LmCreateFieldsParams {
  client_id?: string;
}

export interface LmTicketCreateFields {
  fields?: unknown[];
  [key: string]: unknown;
}

export interface LmOpportunityCreateFields {
  fields?: unknown[];
  [key: string]: unknown;
}

export interface LmOpportunity {
  id: string;
  title?: string;
  is_active?: boolean;
  [key: string]: unknown;
}

export interface LmOpportunityListParams {
  client_id?: string;
  include_inactive?: boolean;
}

export interface LmNote {
  id: string;
  title?: string;
  is_archived?: boolean;
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface LmNoteListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[is_archived]'?: string;
}

export interface LmNoteCreatePayload {
  client_key: string;
  title?: string;
  description_json?: unknown;
}

export interface LmNoteUpdatePayload {
  title?: string;
  description_json?: unknown;
}

export interface LmNoteArchiveStatusPayload {
  is_archived: boolean;
}

export type LmUserUiState = Record<string, unknown>;

export interface LmUserUiStatePayload {
  payload: unknown;
}

export interface LmInsight {
  id?: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmEnrollmentTokenCreatePayload {
  description?: string;
  site_id?: string;
  expires_at?: string;
}

export interface LmEnrollmentToken {
  token?: string;
  expires_at?: string;
  [key: string]: unknown;
}

export interface LmSaasUtilizationSummary {
  client_id?: string;
  [key: string]: unknown;
}
