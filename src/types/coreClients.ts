/**
 * Types for the Core clients surface: clients, contacts, members,
 * opportunities, and sites (read-only, US-only).
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface CoreClient {
  id: string;
  name?: string;
  lifecycle?: string;
  num_contacts?: number;
  num_hardware_assets?: number;
  record_created_at?: string;
  record_updated_at?: string;
  [key: string]: unknown;
}

export interface CoreClientListParams extends CursorPaginationParams {
  'filter[id]'?: string;
  'filter[name]'?: string;
  'filter[lifecycle]'?: string;
  'filter[num_contacts]'?: string;
  'filter[num_hardware_assets]'?: string;
  'filter[record_lineage.source_record_id]'?: string;
  'filter[record_lineage.integration_configuration.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.brand_name]'?: string;
  'filter[record_created_at]'?: string;
  'filter[record_updated_at]'?: string;
  sort?: string;
}

export interface CoreContact {
  id: string;
  title?: string;
  client?: { id?: string; name?: string };
  record_created_at?: string;
  record_updated_at?: string;
  [key: string]: unknown;
}

export interface CoreContactListParams extends CursorPaginationParams {
  'filter[id]'?: string;
  'filter[client.id]'?: string;
  'filter[client.name]'?: string;
  'filter[title]'?: string;
  'filter[record_lineage.source_record_id]'?: string;
  'filter[record_lineage.integration_configuration.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.brand_name]'?: string;
  'filter[record_created_at]'?: string;
  'filter[record_updated_at]'?: string;
  sort?: string;
}

/** POST-based search body for List Contacts / List Members. */
export interface CoreSearchBody {
  filter?: Record<string, unknown>;
}

export interface CoreMember {
  id: string;
  title?: string;
  hired_at?: string;
  is_scalepad_user?: boolean;
  daily_capacity?: number;
  [key: string]: unknown;
}

export interface CoreMemberListParams extends CursorPaginationParams {
  'filter[id]'?: string;
  'filter[hired_at]'?: string;
  'filter[title]'?: string;
  'filter[is_scalepad_user]'?: string;
  'filter[reports_to_member.id]'?: string;
  'filter[hourly_cost.amount]'?: string;
  'filter[daily_capacity]'?: string;
  'filter[record_lineage.source_record_id]'?: string;
  'filter[record_lineage.integration_configuration.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.brand_name]'?: string;
  'filter[record_created_at]'?: string;
  'filter[record_updated_at]'?: string;
  sort?: string;
}

export interface CoreOpportunity {
  id: string;
  title?: string;
  source_status?: string;
  source_stage?: string;
  is_active?: boolean;
  probability?: number;
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface CoreOpportunityListParams {
  'filter[id]'?: string;
  'filter[title]'?: string;
  'filter[source_status]'?: string;
  'filter[source_stage]'?: string;
  'filter[is_active]'?: string;
  'filter[probability]'?: string;
  'filter[client.id]'?: string;
  'filter[client.name]'?: string;
  'filter[contact.id]'?: string;
  'filter[responsible_member.id]'?: string;
  'filter[record_lineage.source_record_id]'?: string;
  'filter[record_lineage.integration_configuration.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.brand_name]'?: string;
  'filter[record_created_at]'?: string;
  'filter[record_updated_at]'?: string;
}

export interface CoreSite {
  id: string;
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface CoreSiteListParams extends CursorPaginationParams {
  'filter[id]'?: string;
  'filter[client.id]'?: string;
  'filter[record_lineage.source_record_id]'?: string;
  'filter[record_lineage.integration_configuration.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.id]'?: string;
}
