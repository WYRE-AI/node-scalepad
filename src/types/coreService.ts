/**
 * Types for the Core service surface: integration configurations/vendors,
 * contracts, and tickets (read-only, US-only).
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface CoreIntegrationConfiguration {
  id: string;
  vendor?: { id?: string; brand_name?: string };
  [key: string]: unknown;
}

export interface CoreIntegrationVendor {
  id: string;
  name?: string;
  category?: string;
  [key: string]: unknown;
}

export interface CoreIntegrationVendorListParams extends CursorPaginationParams {
  'filter[name]'?: string;
  'filter[vendor_id]'?: string;
  'filter[category]'?: string;
}

export interface CoreContract {
  id: string;
  name?: string;
  status?: string;
  type?: string;
  is_recurring?: boolean;
  is_addendum?: boolean;
  source_type?: string;
  client?: { id?: string; name?: string };
  term?: {
    starts_at?: string;
    ends_at?: string;
    is_auto_renew?: boolean;
    billing_period?: string;
  };
  parent_contract?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface CoreContractListParams {
  'filter[id]'?: string;
  'filter[name]'?: string;
  'filter[client.id]'?: string;
  'filter[client.name]'?: string;
  'filter[contact.id]'?: string;
  'filter[is_recurring]'?: string;
  'filter[type]'?: string;
  'filter[term.starts_at]'?: string;
  'filter[term.ends_at]'?: string;
  'filter[term.is_auto_renew]'?: string;
  'filter[term.billing_period]'?: string;
  'filter[source_type]'?: string;
  'filter[is_addendum]'?: string;
  'filter[parent_contract.id]'?: string;
  'filter[parent_contract.name]'?: string;
  'filter[status]'?: string;
}

export interface CoreTicket {
  id: string;
  category?: string;
  is_child_ticket?: boolean;
  is_long_ticket?: boolean;
  client?: { id?: string; name?: string };
  board?: { id?: string; name?: string };
  timeline?: { created_at?: string; updated_at?: string; responded_at?: string };
  [key: string]: unknown;
}

export interface CoreTicketListParams {
  'filter[id]'?: string;
  'filter[owner_member.id]'?: string;
  'filter[responsible_member.id]'?: string;
  'filter[client.id]'?: string;
  'filter[client.name]'?: string;
  'filter[contact.id]'?: string;
  'filter[contract.id]'?: string;
  'filter[contract.name]'?: string;
  'filter[board.id]'?: string;
  'filter[board.name]'?: string;
  'filter[category]'?: string;
  'filter[is_child_ticket]'?: string;
  'filter[is_long_ticket]'?: string;
  'filter[timeline.created_at]'?: string;
  'filter[timeline.updated_at]'?: string;
  'filter[timeline.responded_at]'?: string;
}
