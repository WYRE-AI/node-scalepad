import type { CursorPaginationParams } from '../pagination.js';

/** A Quoter quote. */
export interface QuoterQuote {
  id: string;
  name?: string;
  custom_number?: string;
  stage?: string;
  draft?: boolean;
  uuid?: string;
  [key: string]: unknown;
}

export interface QuoterQuoteListParams extends CursorPaginationParams {
  'filter[expired_at]'?: string;
  'filter[record_created_at]'?: string;
  'filter[record_updated_at]'?: string;
  'filter[won_at]'?: string;
  'filter[client.id]'?: string;
  'filter[custom_number]'?: string;
  'filter[draft]'?: boolean;
  'filter[email_status]'?: string;
  'filter[id]'?: string;
  'filter[lm_initiative_id]'?: string;
  'filter[name]'?: string;
  'filter[primary]'?: boolean;
  'filter[recurring_interval]'?: string;
  'filter[stage]'?: string;
  'filter[uuid]'?: string;
  sort?: string;
}

export interface QuoterQuoteCreateRequest {
  contact?: Record<string, unknown> | string;
  template_id?: string;
  comments?: string;
  cover_page_content?: string;
  cover_page_subtitle?: string;
  cover_page_title?: string;
  currency_iso?: string;
  custom_number?: string;
  expired_at?: string;
  internal_notes?: string;
}

/** A quote line item. */
export interface QuoterLineItem {
  id: string;
  name?: string;
  quantity?: number;
  [key: string]: unknown;
}

/** Body for the top-level line item create endpoint (POST /v1/line-items). */
export interface QuoterLineItemCreateRequest {
  quote_id: string;
  name: string;
  category?: string;
  quantity?: number;
  description?: string;
  manufacturer?: string;
  part_number?: string;
  recurring?: boolean;
  supplier?: string;
  supplier_sku?: string;
}

/** Body for creating or patching a line item within a quote section. */
export interface QuoterSectionLineItemRequest {
  category?: string;
  code?: string;
  description?: string;
  discount?: string | number;
  manufacturer?: string;
  name?: string;
  quantity_decimal?: string | number;
  recurring_interval?: string;
  sku?: string;
  supplier?: string;
}

/** A section within a quote. */
export interface QuoterQuoteSection {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface QuoterQuoteSectionCreateRequest {
  name: string;
}

/** A quote template. */
export interface QuoterQuoteTemplate {
  id: string;
  title?: string;
  [key: string]: unknown;
}

export interface QuoterQuoteTemplateListParams extends CursorPaginationParams {
  'filter[title]'?: string;
  sort?: string;
}
