import type { CmClientRef, CmSearchRequest } from './cmHealth.js';

/** A ControlMap evidence record. */
export interface CmEvidence {
  id: string;
  title?: string;
  description?: string;
  owner?: string;
  repeat_type?: string;
  schedule?: Record<string, unknown>;
  [key: string]: unknown;
}

/** Search body for the evidences search endpoint. */
export interface CmEvidenceSearchRequest extends CmSearchRequest {
  fetch_items?: boolean;
  evidence_request?: Record<string, unknown>;
}

export interface CmEvidenceCreateRequest {
  title: string;
  description?: string;
  owner_email?: string;
  assignee_email?: string;
  repeat_type?: string;
  schedule?: Record<string, unknown>;
  mappings?: Record<string, unknown>;
}

export interface CmEvidenceUpdateRequest {
  title?: string;
  description?: string;
  owner?: string;
  schedule?: Record<string, unknown>;
}

/** Per-client evidence rollup returned by the evidences-summary listing. */
export interface CmEvidenceSummary {
  client?: CmClientRef;
  [key: string]: unknown;
}

/** An evidence request (collection cycle) on an evidence record. */
export interface CmEvidenceRequest {
  id: string;
  status?: string;
  assigned_to?: string;
  due_date?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface CmEvidenceRequestUpdateRequest {
  assigned_to?: string;
  status?: string;
  due_date?: string;
  notes?: string;
}

/** Query params for deleting an evidence refresh schedule. */
export interface CmEvidenceScheduleDeleteParams {
  schedule_action?: string;
}

/** Body for attaching a hyperlink to an evidence request. */
export interface CmEvidenceLinkCreateRequest {
  evidence_request_id: string;
  name?: string;
  hyperlink: string;
}

/** A hyperlink attached to an evidence request. */
export interface CmEvidenceLink {
  id?: string;
  name?: string;
  hyperlink?: string;
  [key: string]: unknown;
}

/** Payload for the evidence map/unmap endpoints. */
export interface CmEvidenceMappingsRequest {
  objective_codes?: string[];
  control_codes?: string[];
  assessment_question_codes?: string[];
}
