import type { CmClientRef } from './cmHealth.js';

/** A ControlMap client risk. */
export interface CmRisk {
  id: string;
  code?: string;
  title?: string;
  description?: string;
  status?: string;
  owner_email?: string;
  team?: string;
  department?: string;
  category?: string;
  [key: string]: unknown;
}

export interface CmRiskCreateRequest {
  name: string;
  description?: string;
  status?: string;
  department?: string;
  risk_category?: string;
  owner_email?: string;
  business_impact?: string;
  impact?: number | string;
  likelihood?: number | string;
}

export interface CmRiskUpdateRequest {
  code?: string;
  title?: string;
  description?: string;
  status?: string;
  owner_email?: string;
  team?: string;
  department?: string;
  category?: string;
}

/** Cross-entity payload for the risk map/unmap endpoints. */
export interface CmRiskMappingsRequest {
  asset_codes?: string[];
  asset_type_names?: string[];
  threat_codes?: string[];
  vulnerability_codes?: string[];
  vendor_codes?: string[];
  objective_codes?: string[];
  control_codes?: string[];
  action_item_codes?: string[];
}

/** Per-client risk rollup returned by the risks-summary listing. */
export interface CmRiskSummary {
  client?: CmClientRef;
  [key: string]: unknown;
}

export interface CmRiskCategory {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface CmRiskDepartment {
  name?: string;
  [key: string]: unknown;
}
