import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { CmSummaryListParams } from '../types/cmHealth.js';
import type {
  CmAssessmentAnswerRequest,
  CmAssessmentQuestion,
  CmAssessmentQuestionMappingsRequest,
  CmAssessmentQuestionSearchRequest,
  CmAssessmentResponse,
  CmAssessmentResponseCreateRequest,
  CmAssessmentResponseUpdateRequest,
  CmAssessmentSummary,
  CmAssessmentSummaryParams,
} from '../types/cmAssessments.js';

/** ControlMap common assessments: questions, answers, and responses. */
export class CmAssessmentsResource {
  constructor(private readonly http: HttpClient) {}

  /** Clients Assessment Overview — GET /controlmap/v1/clients/assessments/common/summary */
  async listSummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmAssessmentSummary>> {
    return this.http.request('/controlmap/v1/clients/assessments/common/summary', {
      params: params as Record<string, unknown>,
    });
  }

  /** Client Assessment Summary — GET /controlmap/v1/clients/{client_id}/assessments/common/summary */
  async getSummary(
    clientId: string,
    params?: CmAssessmentSummaryParams
  ): Promise<CmAssessmentSummary> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/assessments/common/summary`,
      { params: params as Record<string, unknown> }
    );
  }

  /** Search Client Assessment Questions — POST /controlmap/v1/clients/{client_id}/assessments/common/questions */
  async searchQuestions(
    clientId: string,
    body?: CmAssessmentQuestionSearchRequest
  ): Promise<CursorPaginatedResponse<CmAssessmentQuestion>> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions`,
      { method: 'POST', body: body ?? {} }
    );
  }

  /** Get Assessment Question — GET /controlmap/v1/clients/{client_id}/assessments/common/questions/{question_code} */
  async getQuestion(clientId: string, questionCode: string): Promise<CmAssessmentQuestion> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions/${questionCode}`
    );
  }

  /** Save Assessment Question Answer — PUT /controlmap/v1/clients/{client_id}/assessments/common/questions/{question_code}/answer */
  async saveAnswer(
    clientId: string,
    questionCode: string,
    body: CmAssessmentAnswerRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions/${questionCode}/answer`,
      { method: 'PUT', body }
    );
  }

  /** Clear Assessment Question Answer — DELETE /controlmap/v1/clients/{client_id}/assessments/common/questions/{question_code}/answer */
  async clearAnswer(clientId: string, questionCode: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions/${questionCode}/answer`,
      { method: 'DELETE' }
    );
  }

  /** Map Assessment Question to Items — POST /controlmap/v1/clients/{client_id}/assessments/common/questions/{question_code}/mappings */
  async mapQuestion(
    clientId: string,
    questionCode: string,
    body: CmAssessmentQuestionMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions/${questionCode}/mappings`,
      { method: 'POST', body }
    );
  }

  /** Unmap Assessment Question from Items — DELETE /controlmap/v1/clients/{client_id}/assessments/common/questions/{question_code}/mappings */
  async unmapQuestion(
    clientId: string,
    questionCode: string,
    body: CmAssessmentQuestionMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions/${questionCode}/mappings`,
      { method: 'DELETE', body }
    );
  }

  /** Create Assessment Question Response — POST /controlmap/v1/clients/{client_id}/assessments/common/questions/{question_code}/responses */
  async createResponse(
    clientId: string,
    questionCode: string,
    body: CmAssessmentResponseCreateRequest
  ): Promise<CmAssessmentResponse> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions/${questionCode}/responses`,
      { method: 'POST', body }
    );
  }

  /** Update Assessment Question Response — PATCH /controlmap/v1/clients/{client_id}/assessments/common/questions/{question_code}/responses */
  async updateResponse(
    clientId: string,
    questionCode: string,
    body: CmAssessmentResponseUpdateRequest
  ): Promise<CmAssessmentResponse> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions/${questionCode}/responses`,
      { method: 'PATCH', body }
    );
  }

  /** Delete Assessment Question Response — DELETE /controlmap/v1/clients/{client_id}/assessments/common/questions/{question_code}/responses/{response_id} */
  async deleteResponse(
    clientId: string,
    questionCode: string,
    responseId: string
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/assessments/common/questions/${questionCode}/responses/${responseId}`,
      { method: 'DELETE' }
    );
  }
}
