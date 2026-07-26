/**
 * Types for the Lifecycle Manager deliverables surface: deliverables,
 * deliverable templates, catalog components/integrations, sections, and
 * general share links.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmDeliverable {
  id: string;
  name?: string;
  status?: string;
  sections?: unknown[];
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface LmDeliverableListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[status]'?: string;
  'filter[created_by]'?: string;
  'filter[has_meeting]'?: string;
  'filter[name]'?: string;
  sort?: string;
}

export interface LmDeliverableCreatePayload {
  name: string;
  sections?: unknown[];
}

export interface LmDeliverableUpdatePayload {
  name?: string;
  status?: string;
  sections?: unknown[];
}

export interface LmDeliverableCreateFromTemplatePayload {
  name?: string;
}

export interface LmDeliverablePresentation {
  id?: string;
  [key: string]: unknown;
}

export interface LmDeliverableTemplate {
  id: string;
  name?: string;
  sections?: unknown[];
  [key: string]: unknown;
}

export interface LmDeliverableTemplateCreatePayload {
  name: string;
  sections?: unknown[];
}

export interface LmDeliverableTemplateUpdatePayload {
  name?: string;
  sections?: unknown[];
}

export interface LmDeliverableCatalogComponent {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmDeliverableIntegration {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmDeliverableShareLink {
  url?: string;
  [key: string]: unknown;
}
