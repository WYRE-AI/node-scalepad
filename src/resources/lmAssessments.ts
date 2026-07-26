import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  LmAssessment,
  LmAssessmentCompletionStatusPayload,
  LmAssessmentCreatePayload,
  LmAssessmentEvaluatePayload,
  LmAssessmentInternalCommentPayload,
  LmAssessmentListParams,
  LmAssessmentQuestionCommentPayload,
  LmAssessmentTemplate,
  LmAssessmentTemplatePayload,
  LmAssessmentUpdatePayload,
} from '../types/lmAssessments.js';

/**
 * Lifecycle Manager assessments surface: assessments, assessment templates,
 * question comments, and evaluations.
 */
export class LmAssessmentsResource {
  constructor(private readonly http: HttpClient) {}

  async list(params?: LmAssessmentListParams): Promise<CursorPaginatedResponse<LmAssessment>> {
    return this.http.request('/lifecycle-manager/v1/assessments', {
      params: params as Record<string, unknown>,
    });
  }

  async get(id: string): Promise<LmAssessment> {
    return this.http.request(`/lifecycle-manager/v1/assessments/${id}`);
  }

  async create(payload: LmAssessmentCreatePayload): Promise<LmAssessment> {
    return this.http.request('/lifecycle-manager/v1/assessments', {
      method: 'POST',
      body: payload,
    });
  }

  async update(id: string, payload: LmAssessmentUpdatePayload): Promise<LmAssessment> {
    return this.http.request(`/lifecycle-manager/v1/assessments/${id}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(id: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/assessments/${id}`, { method: 'DELETE' });
  }

  async evaluate(id: string, payload: LmAssessmentEvaluatePayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/assessments/${id}/evaluate`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateCompletionStatus(
    id: string,
    payload: LmAssessmentCompletionStatusPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/assessments/${id}/completion-status`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateInternalComment(
    id: string,
    payload: LmAssessmentInternalCommentPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/assessments/${id}/internal-comment`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateQuestionPublicComment(
    assessmentId: string,
    questionId: string,
    payload: LmAssessmentQuestionCommentPayload
  ): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/assessments/${assessmentId}/questions/${questionId}/comment/public`,
      { method: 'PUT', body: payload }
    );
  }

  async updateQuestionInternalComment(
    assessmentId: string,
    questionId: string,
    payload: LmAssessmentQuestionCommentPayload
  ): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/assessments/${assessmentId}/questions/${questionId}/comment/internal`,
      { method: 'PUT', body: payload }
    );
  }

  // --- Templates ---

  async listTemplates(): Promise<{ data: LmAssessmentTemplate[] }> {
    return this.http.request('/lifecycle-manager/v1/assessment-templates');
  }

  async getTemplate(assessmentTemplateId: string): Promise<LmAssessmentTemplate> {
    return this.http.request(`/lifecycle-manager/v1/assessment-templates/${assessmentTemplateId}`);
  }

  async createTemplate(payload: LmAssessmentTemplatePayload): Promise<LmAssessmentTemplate> {
    return this.http.request('/lifecycle-manager/v1/assessment-templates', {
      method: 'POST',
      body: payload,
    });
  }

  async updateTemplate(
    assessmentTemplateId: string,
    payload: LmAssessmentTemplatePayload
  ): Promise<LmAssessmentTemplate> {
    return this.http.request(
      `/lifecycle-manager/v1/assessment-templates/${assessmentTemplateId}`,
      { method: 'PUT', body: payload }
    );
  }

  async deleteTemplate(assessmentTemplateId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/assessment-templates/${assessmentTemplateId}`,
      { method: 'DELETE' }
    );
  }
}
