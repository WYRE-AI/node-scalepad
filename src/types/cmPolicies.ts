import type { CmClientRef } from './cmHealth.js';

/** A ControlMap governance document. */
export interface CmGovernance {
  id: string;
  title?: string;
  description?: string;
  code?: string;
  status?: string;
  [key: string]: unknown;
}

/** A ControlMap policy. */
export interface CmPolicy {
  id: string;
  title?: string;
  code?: string;
  status?: string;
  sections?: CmPolicySection[];
  [key: string]: unknown;
}

/** A ControlMap procedure. */
export interface CmProcedure {
  id: string;
  title?: string;
  description?: string;
  code?: string;
  status?: string;
  [key: string]: unknown;
}

/** A section within a ControlMap policy. */
export interface CmPolicySection {
  id?: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface CmGovernanceCreateRequest {
  title: string;
  description?: string;
}

export interface CmPolicyCreateRequest {
  title: string;
  policy_template_name?: string;
  sections?: Array<{ title?: string; description?: string }>;
}

export interface CmProcedureCreateRequest {
  title: string;
  description?: string;
}

export interface CmGovernanceUpdateRequest {
  title?: string;
  description?: string;
  code?: string;
  status?: string;
  data_classification?: string;
  review_date?: string;
  owner?: string;
  approver?: string;
  team?: string;
  tags?: string[];
}

export interface CmPolicyUpdateRequest {
  title?: string;
  code?: string;
  status?: string;
  data_classification?: string;
  review_date?: string;
  owner?: string;
  approver?: string;
  team?: string;
  tags?: string[];
  contributors?: string[];
}

export interface CmProcedureUpdateRequest {
  title?: string;
  description?: string;
  code?: string;
  status?: string;
  data_classification?: string;
  review_date?: string;
  owner?: string;
  approver?: string;
  team?: string;
  tags?: string[];
}

/** Body for PUT create-or-update of a policy section. */
export interface CmPolicySectionUpsertRequest {
  id?: string;
  title?: string;
  description?: string;
}

/** Payload for the governance map/unmap endpoints. */
export interface CmGovernanceMappingsRequest {
  objectives?: string[];
  policy_codes?: string[];
  control_codes?: string[];
}

/** Payload for the policy map/unmap endpoints. */
export interface CmPolicyMappingsRequest {
  objectives?: string[];
  control_codes?: string[];
}

/** Payload for the procedure map/unmap endpoints. */
export interface CmProcedureMappingsRequest {
  objectives?: string[];
  policy_codes?: string[];
  control_codes?: string[];
}

export interface CmGovernanceSummary {
  client?: CmClientRef;
  [key: string]: unknown;
}

export interface CmPolicySummary {
  client?: CmClientRef;
  [key: string]: unknown;
}

export interface CmProcedureSummary {
  client?: CmClientRef;
  [key: string]: unknown;
}
