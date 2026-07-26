import type { CursorPaginationParams } from '../pagination.js';
import type { CmClientRef } from './cmHealth.js';

/** A ControlMap client control. */
export interface CmControl {
  id: string;
  name?: string;
  description?: string;
  code?: string;
  status?: string;
  type?: string;
  owner?: string;
  frequency?: string;
  team?: string;
  [key: string]: unknown;
}

export interface CmControlCreateRequest {
  name: string;
  type?: string;
  description?: string;
  tag?: string;
  contributors?: string[];
  owner_email?: string;
  control_set_name?: string;
  control_family_name?: string;
}

export interface CmControlUpdateRequest {
  name?: string;
  description?: string;
  code?: string;
  status?: string;
  owner?: string;
  type?: string;
  frequency?: string;
  team?: string;
  implementation_notes?: string;
  control_family_name?: string;
}

/** Cross-entity payload for the control map/unmap endpoints. */
export interface CmControlMappingsRequest {
  evidence_codes?: string[];
  policy_codes?: string[];
  risk_codes?: string[];
  action_item_codes?: string[];
  procedure_codes?: string[];
  governance_codes?: string[];
  objectives?: string[];
}

export interface CmControlFamily {
  id: string;
  name?: string;
  code?: string;
  [key: string]: unknown;
}

export interface CmControlSet {
  id: string;
  name?: string;
  code?: string;
  [key: string]: unknown;
}

/** Per-client control rollup returned by the controls-summary endpoints. */
export interface CmControlSummary {
  client?: CmClientRef;
  [key: string]: unknown;
}

/** Query params for the control-families and control-sets listings. */
export interface CmCodeNameFilterParams extends CursorPaginationParams {
  'filter[id]'?: string;
  'filter[name]'?: string;
  'filter[code]'?: string;
}
