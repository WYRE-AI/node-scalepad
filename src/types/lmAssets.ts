/**
 * Types for the Lifecycle Manager assets surface: hardware assets,
 * lifecycles, warranty pricing, and attached initiative/agreement lookups.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmWarrantyPricing {
  id?: string;
  warranty_type?: string;
  price?: { amount?: number; currency?: string };
  [key: string]: unknown;
}

export interface LmWarrantyPricingListParams extends CursorPaginationParams {
  client_id?: string;
  warranty_type?: string;
  sort?: string;
}

export interface LmHardwareReplacementSettings {
  client_id?: string;
  [key: string]: unknown;
}

export interface LmHardwareReplacementSettingsParams {
  client_id?: string;
}

export interface LmHardwareDashboard {
  [key: string]: unknown;
}

export interface LmHardwareDashboardParams {
  'filter[client_id]'?: string;
}

export interface LmHardwareOverviewPayload {
  hardware_key: string;
  client_id?: string;
}

export interface LmHardwareOverview {
  hardware_key?: string;
  [key: string]: unknown;
}

export interface LmHardwareAsset {
  id?: string;
  hardware_key?: string;
  name?: string;
  serial_number?: string;
  client_id?: string;
  [key: string]: unknown;
}

export interface LmHardwareAssetListParams extends CursorPaginationParams {
  search?: string;
  client_id?: string;
  sort?: string;
  'filter[age]'?: string;
  'filter[assignedenduser]'?: string;
  'filter[configuredbackup]'?: string;
  'filter[hasscalepadwarranty]'?: string;
  'filter[initiativecount]'?: string;
  'filter[installedsoftware]'?: string;
  'filter[installedsoftwarecategory]'?: string;
  'filter[integrationsources]'?: string;
  'filter[manufacturer.name]'?: string;
  'filter[memory]'?: string;
  'filter[processor]'?: string;
}

export interface LmHardwareLifecycle {
  id?: string;
  serial_number?: string;
  client_id?: string;
  [key: string]: unknown;
}

export interface LmHardwareLifecycleListParams extends CursorPaginationParams {
  'filter[client_id]'?: string;
  'filter[serial_number]'?: string;
}

export interface LmHardwareKeyPayload {
  hardware_key: string;
}

export interface LmAttachedInitiative {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmAttachedAgreement {
  id: string;
  name?: string;
  [key: string]: unknown;
}
