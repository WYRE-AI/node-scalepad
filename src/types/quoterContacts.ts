import type { CursorPaginationParams } from '../pagination.js';

/** A Quoter contact (billing/shipping person a quote is addressed to). */
export interface QuoterContact {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  organization?: string;
  [key: string]: unknown;
}

export interface QuoterContactListParams extends CursorPaginationParams {
  fields?: string;
  sort?: string;
  'filter[id]'?: string;
  'filter[client.id]'?: string;
  'filter[billing_email]'?: string;
  'filter[email]'?: string;
  'filter[first_name]'?: string;
  'filter[last_name]'?: string;
  'filter[phone]'?: string;
  'filter[organization]'?: string;
  'filter[address]'?: string;
  'filter[city]'?: string;
  'filter[country]'?: string;
  'filter[region]'?: string;
  'filter[postal_code]'?: string;
  'filter[record_created_at]'?: string;
}

export interface QuoterContactCreateRequest {
  billing_address?: Record<string, unknown> | string;
  billing_email?: string;
  billing_first_name?: string;
  billing_last_name?: string;
  billing_organization?: string;
  billing_mobile_phone?: string;
  billing_work_phone?: string;
  client?: Record<string, unknown> | string;
  shipping_address?: Record<string, unknown> | string;
  shipping_email?: string;
}

export interface QuoterContactUpdateRequest {
  billing_address?: Record<string, unknown> | string;
  billing_email?: string;
  billing_first_name?: string;
  billing_last_name?: string;
  billing_mobile_phone?: string;
  billing_organization?: string;
  billing_work_phone?: string;
  shipping_address?: Record<string, unknown> | string;
  shipping_email?: string;
  shipping_first_name?: string;
}
