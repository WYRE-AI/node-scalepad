/**
 * Types for the Lifecycle Manager initiatives surface: initiatives (v1+v2),
 * initiative templates, roadmap exports, and the ticket/opportunity/
 * meeting/goal/action-item/asset attachments hanging off an initiative.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmInitiative {
  id: string;
  name?: string;
  status?: string;
  priority?: string;
  executive_summary?: string;
  client?: { id?: string; name?: string };
  assigned_user_id?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface LmInitiativeListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[status]'?: string;
  'filter[priority]'?: string;
  'filter[scheduled]'?: string;
  'filter[scheduled_period]'?: string;
  'filter[assigned_user_id]'?: string;
  'filter[created_at]'?: string;
  'filter[updated_at]'?: string;
}

export interface LmInitiativeCreatePayload {
  client_key: string;
  name: string;
  executive_summary?: string;
  executive_summary_json?: unknown;
}

export interface LmInitiativeUpdatePayload {
  name?: string;
  executive_summary?: string;
  executive_summary_json?: unknown;
}

export interface LmInitiativeStatusPayload {
  status: string;
}

export interface LmInitiativeSchedulePayload {
  fiscal_quarter: unknown;
}

export interface LmInitiativeRecurringPayload {
  recurring_line_items: unknown[];
}

export interface LmInitiativePriorityPayload {
  priority: string;
}

export interface LmInitiativeBudgetPayload {
  budget_line_items: unknown[];
}

export interface LmInitiativeAssignedUserPayload {
  assigned_user_id: string;
}

export interface LmInitiativeAssetsPayload {
  hardware_keys: string[];
}

/** PSA field values used when creating a linked ticket or opportunity. */
export interface LmInitiativeFieldValuesPayload {
  field_values: unknown;
}

export interface LmInitiativeTicket {
  id?: string;
  status?: string;
  [key: string]: unknown;
}

export interface LmInitiativeOpportunity {
  id?: string;
  title?: string;
  [key: string]: unknown;
}

export interface LmInitiativeQuote {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmInitiativeTemplate {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmInitiativeTemplateListParams extends CursorPaginationParams {}

export interface LmInitiativeTemplatePayload {
  initiative_template: Record<string, unknown>;
}

export interface LmRoadmapExportPayload {
  client_id: string;
  roadmap_download_payload?: Record<string, unknown>;
}
