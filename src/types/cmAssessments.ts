import type { CmClientRef, CmSearchRequest } from './cmHealth.js';

/** Per-client assessment rollup returned by the assessment summary endpoints. */
export interface CmAssessmentSummary {
  client?: CmClientRef;
  [key: string]: unknown;
}

/** Query params for a single client's assessment summary. */
export interface CmAssessmentSummaryParams {
  include_framework_assessment_stats?: boolean;
}

/** An assessment question for a ControlMap client. */
export interface CmAssessmentQuestion {
  code?: string;
  question?: string;
  answer?: unknown;
  [key: string]: unknown;
}

/** Search body for the assessment questions search endpoint. */
export interface CmAssessmentQuestionSearchRequest extends CmSearchRequest {
  rules?: Record<string, unknown>;
}

/** Body for saving an assessment question answer. */
export interface CmAssessmentAnswerRequest {
  answer: unknown;
}

/** Payload for the assessment question map/unmap endpoints. */
export interface CmAssessmentQuestionMappingsRequest {
  evidence_codes?: string[];
  action_item_codes?: string[];
  policy_codes?: string[];
  procedure_codes?: string[];
}

/** A free-text response recorded against an assessment question. */
export interface CmAssessmentResponse {
  id?: string;
  response?: string;
  provided_by?: string;
  [key: string]: unknown;
}

export interface CmAssessmentResponseCreateRequest {
  response: string;
  provided_by?: string;
}

export interface CmAssessmentResponseUpdateRequest {
  id: string;
  response?: string;
  provided_by?: string;
}
