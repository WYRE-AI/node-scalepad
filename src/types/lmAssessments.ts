/**
 * Types for the Lifecycle Manager assessments surface: assessments,
 * assessment templates, question comments, and evaluations.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmAssessment {
  id: string;
  title?: string;
  status?: string;
  is_completed?: boolean;
  assessment_template_id?: string;
  evaluate_user_id?: string;
  evaluate_at?: string;
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface LmAssessmentListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[status]'?: string;
  'filter[assessment_template_id]'?: string;
}

export interface LmAssessmentCreatePayload {
  client_key: string;
  title: string;
  assessment_template_id?: string;
  evaluate_user_id?: string;
  evaluate_at?: string;
}

export interface LmAssessmentUpdatePayload {
  title?: string;
  evaluate_user_id?: string;
  evaluate_at?: string;
}

export interface LmAssessmentEvaluatePayload {
  question_evaluations: unknown[];
}

export interface LmAssessmentCompletionStatusPayload {
  is_completed: boolean;
}

export interface LmAssessmentInternalCommentPayload {
  internal_comment: string;
}

/** Public/internal comment on a single assessment question. */
export interface LmAssessmentQuestionCommentPayload {
  comment_plain_text?: string;
  comment_json?: unknown;
}

export interface LmAssessmentTemplate {
  id: string;
  title?: string;
  [key: string]: unknown;
}

export interface LmAssessmentTemplatePayload {
  assessment_template: Record<string, unknown>;
}
