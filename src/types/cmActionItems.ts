import type { CmClientRef } from './cmHealth.js';

/** A ControlMap action item (remediation task). */
export interface CmActionItem {
  id: string;
  weakness_name?: string;
  weakness_description?: string;
  status?: string;
  priority?: string;
  corrective_action?: string;
  responsible_person?: string;
  responsible_department?: string;
  efforts_in_hours?: number;
  roadmap?: string;
  [key: string]: unknown;
}

export interface CmActionItemCreateRequest {
  weakness_name: string;
  weakness_description?: string;
  currency?: string;
  priority?: string;
  status?: string;
  corrective_action?: string;
  responsible_person?: string;
  responsible_department?: string;
  efforts_in_hours?: number;
  roadmap?: string;
}

export interface CmActionItemUpdateRequest {
  roadmap?: string;
  weakness_name?: string;
  weakness_description?: string;
  responsible_person?: string;
  status?: string;
  corrective_action?: string;
  responsible_department?: string;
  efforts_in_hours?: number;
  priority?: string;
  planned_start_date?: string;
}

/** Payload for the action item map/unmap endpoints. */
export interface CmActionItemMappingsRequest {
  objective_codes?: string[];
  question_codes?: string[];
  risk_codes?: string[];
  control_codes?: string[];
  asset_codes?: string[];
  asset_type_names?: string[];
}

/** Per-client action item rollup returned by the summary listing. */
export interface CmActionItemSummary {
  client?: CmClientRef;
  [key: string]: unknown;
}
