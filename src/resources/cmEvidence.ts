import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  CmDocument,
  CmDocumentUploadRequest,
  CmListResponse,
  CmSignedUrl,
  CmSignedUrlRequest,
  CmSummaryListParams,
} from '../types/cmHealth.js';
import type {
  CmEvidence,
  CmEvidenceCreateRequest,
  CmEvidenceLink,
  CmEvidenceLinkCreateRequest,
  CmEvidenceMappingsRequest,
  CmEvidenceRequest,
  CmEvidenceRequestUpdateRequest,
  CmEvidenceScheduleDeleteParams,
  CmEvidenceSearchRequest,
  CmEvidenceSummary,
  CmEvidenceUpdateRequest,
} from '../types/cmEvidence.js';

/** ControlMap evidence records, evidence requests, and documents. */
export class CmEvidenceResource {
  constructor(private readonly http: HttpClient) {}

  /** List Client Evidences — POST /controlmap/v1/clients/{client_id}/evidences/search */
  async search(
    clientId: string,
    body?: CmEvidenceSearchRequest
  ): Promise<CursorPaginatedResponse<CmEvidence>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/evidences/search`, {
      method: 'POST',
      body: body ?? {},
    });
  }

  /** List Clients Evidence Summaries — GET /controlmap/v1/clients/evidences-summary */
  async listSummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmEvidenceSummary>> {
    return this.http.request('/controlmap/v1/clients/evidences-summary', {
      params: params as Record<string, unknown>,
    });
  }

  /** Create Client Evidence — POST /controlmap/v1/clients/{client_id}/evidences */
  async create(clientId: string, body: CmEvidenceCreateRequest): Promise<CmEvidence> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/evidences`, {
      method: 'POST',
      body,
    });
  }

  /** Get Evidence by ID — GET /controlmap/v1/clients/{client_id}/evidences/{evidence_id} */
  async get(clientId: string, evidenceId: string): Promise<CmEvidence> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/evidences/${evidenceId}`);
  }

  /** Update Client Evidence — PATCH /controlmap/v1/clients/{client_id}/evidences/{evidence_id} */
  async update(
    clientId: string,
    evidenceId: string,
    body: CmEvidenceUpdateRequest
  ): Promise<CmEvidence> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/evidences/${evidenceId}`, {
      method: 'PATCH',
      body,
    });
  }

  /** Delete Client Evidence — DELETE /controlmap/v1/clients/{client_id}/evidences/{evidence_id} */
  async delete(clientId: string, evidenceId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/evidences/${evidenceId}`,
      { method: 'DELETE' }
    );
  }

  /** Delete Evidence Refresh Schedule — DELETE /controlmap/v1/clients/{client_id}/evidences/{evidence_id}/schedule */
  async deleteSchedule(
    clientId: string,
    evidenceId: string,
    params?: CmEvidenceScheduleDeleteParams
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/evidences/${evidenceId}/schedule`,
      { method: 'DELETE', params: params as Record<string, unknown> }
    );
  }

  /** Map Evidence to Objectives or Controls — POST /controlmap/v1/clients/{client_id}/evidences/{evidence_id}/mappings */
  async map(clientId: string, evidenceId: string, body: CmEvidenceMappingsRequest): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/evidences/${evidenceId}/mappings`,
      { method: 'POST', body }
    );
  }

  /** Unmap Evidence from Objectives or Controls — POST /controlmap/v1/clients/{client_id}/evidences/{evidence_id}/mappings/bulk-delete */
  async unmap(
    clientId: string,
    evidenceId: string,
    body: CmEvidenceMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/evidences/${evidenceId}/mappings/bulk-delete`,
      { method: 'POST', body }
    );
  }

  /** Refresh Client Evidence Mappings — POST /controlmap/v1/clients/{client_id}/evidence-mappings/refresh */
  async refreshMappings(clientId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/evidence-mappings/refresh`,
      { method: 'POST' }
    );
  }

  /** List Evidence Requests — GET /controlmap/v1/clients/{client_id}/evidences/{evidence_id}/requests */
  async listRequests(
    clientId: string,
    evidenceId: string
  ): Promise<CmListResponse<CmEvidenceRequest>> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/evidences/${evidenceId}/requests`
    );
  }

  /** Create Request in Evidence — POST /controlmap/v1/clients/{client_id}/evidences/{evidence_id}/requests */
  async createRequest(clientId: string, evidenceId: string): Promise<CmEvidenceRequest> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/evidences/${evidenceId}/requests`,
      { method: 'POST' }
    );
  }

  /** Partially Update Evidence Request — PATCH /controlmap/v1/clients/{client_id}/evidence-requests/{evidence_request_id} */
  async updateRequest(
    clientId: string,
    evidenceRequestId: string,
    body: CmEvidenceRequestUpdateRequest
  ): Promise<CmEvidenceRequest> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/evidence-requests/${evidenceRequestId}`,
      { method: 'PATCH', body }
    );
  }

  /** Delete Evidence Request — DELETE /controlmap/v1/clients/{client_id}/evidence-requests/{evidence_request_id} */
  async deleteRequest(clientId: string, evidenceRequestId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/evidence-requests/${evidenceRequestId}`,
      { method: 'DELETE' }
    );
  }

  /** Archive Evidence Request — POST /controlmap/v1/clients/{client_id}/evidence-requests/{evidence_request_id}/archive */
  async archiveRequest(clientId: string, evidenceRequestId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/evidence-requests/${evidenceRequestId}/archive`,
      { method: 'POST' }
    );
  }

  /** Create Link for Evidence Request — POST /controlmap/v1/clients/{client_id}/evidence-requests/links */
  async createRequestLink(
    clientId: string,
    body: CmEvidenceLinkCreateRequest
  ): Promise<CmEvidenceLink> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/evidence-requests/links`, {
      method: 'POST',
      body,
    });
  }

  /** Create Evidence Request with URLs — POST /controlmap/v1/clients/{client_id}/evidences/{evidence_id}/documents/signed-url */
  async createRequestSignedUrl(
    clientId: string,
    evidenceId: string,
    body: CmSignedUrlRequest
  ): Promise<CmSignedUrl> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/evidences/${evidenceId}/documents/signed-url`,
      { method: 'POST', body }
    );
  }

  /** Generate Signed URLs for Evidence — POST /controlmap/v1/clients/{client_id}/evidence-requests/{evidence_request_id}/documents/signed-url */
  async createRequestDocumentSignedUrl(
    clientId: string,
    evidenceRequestId: string,
    body: CmSignedUrlRequest
  ): Promise<CmSignedUrl> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/evidence-requests/${evidenceRequestId}/documents/signed-url`,
      { method: 'POST', body }
    );
  }

  /**
   * Create Evidence Request with Upload — POST /controlmap/v1/clients/{client_id}/evidences/{evidence_id}/documents
   *
   * The API accepts multipart uploads up to 10 MB; prefer the signed-URL flow
   * ({@link createRequestSignedUrl}) for SDK use.
   */
  async uploadDocument(
    clientId: string,
    evidenceId: string,
    body: CmDocumentUploadRequest
  ): Promise<CmDocument> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/evidences/${evidenceId}/documents`,
      { method: 'POST', body }
    );
  }

  /**
   * Upload Document to Evidence Request — POST /controlmap/v1/clients/{client_id}/evidence-requests/{evidence_request_id}/documents
   *
   * The API accepts multipart uploads up to 10 MB; prefer the signed-URL flow
   * ({@link createRequestDocumentSignedUrl}) for SDK use.
   */
  async uploadRequestDocument(
    clientId: string,
    evidenceRequestId: string,
    body: CmDocumentUploadRequest
  ): Promise<CmDocument> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/evidence-requests/${evidenceRequestId}/documents`,
      { method: 'POST', body }
    );
  }

  /** Get Document Signed URL — GET /controlmap/v1/clients/{client_id}/documents/{document_id} */
  async getDocumentSignedUrl(clientId: string, documentId: string): Promise<CmSignedUrl> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/documents/${documentId}`);
  }

  /** Delete Document — DELETE /controlmap/v1/clients/{client_id}/documents/{document_id} */
  async deleteDocument(clientId: string, documentId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/documents/${documentId}`,
      { method: 'DELETE' }
    );
  }
}
