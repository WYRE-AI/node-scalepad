import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { CmListResponse, CmSearchRequest, CmSummaryListParams } from '../types/cmHealth.js';
import type {
  CmRisk,
  CmRiskCategory,
  CmRiskCreateRequest,
  CmRiskDepartment,
  CmRiskMappingsRequest,
  CmRiskSummary,
  CmRiskUpdateRequest,
} from '../types/cmRisks.js';

/** ControlMap client risks: search, CRUD, mappings, and rollups. */
export class CmRisksResource {
  constructor(private readonly http: HttpClient) {}

  /** Search Client Risks — POST /controlmap/v1/clients/{client_id}/risks/search */
  async search(clientId: string, body?: CmSearchRequest): Promise<CursorPaginatedResponse<CmRisk>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/risks/search`, {
      method: 'POST',
      body: body ?? {},
    });
  }

  /** Create Client Risk — POST /controlmap/v1/clients/{client_id}/risks */
  async create(clientId: string, body: CmRiskCreateRequest): Promise<CmRisk> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/risks`, {
      method: 'POST',
      body,
    });
  }

  /** Get Client Risk — GET /controlmap/v1/clients/{client_id}/risks/{risk_id} */
  async get(clientId: string, riskId: string): Promise<CmRisk> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/risks/${riskId}`);
  }

  /** Partially Update Client Risk — PATCH /controlmap/v1/clients/{client_id}/risks/{risk_id} */
  async update(clientId: string, riskId: string, body: CmRiskUpdateRequest): Promise<CmRisk> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/risks/${riskId}`, {
      method: 'PATCH',
      body,
    });
  }

  /** Delete Client Risk — DELETE /controlmap/v1/clients/{client_id}/risks/{risk_id} */
  async delete(clientId: string, riskId: string): Promise<void> {
    await this.http.request<void>(`/controlmap/v1/clients/${clientId}/risks/${riskId}`, {
      method: 'DELETE',
    });
  }

  /** List Clients Risk Summaries — GET /controlmap/v1/clients/risks-summary */
  async listSummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmRiskSummary>> {
    return this.http.request('/controlmap/v1/clients/risks-summary', {
      params: params as Record<string, unknown>,
    });
  }

  /** Map Risk to Assets and Vendors — POST /controlmap/v1/clients/{client_id}/risks/{risk_id}/mappings */
  async map(clientId: string, riskId: string, body: CmRiskMappingsRequest): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/risks/${riskId}/mappings`,
      { method: 'POST', body }
    );
  }

  /** Unmap Risk from Assets and Vendors — POST /controlmap/v1/clients/{client_id}/risks/{risk_id}/mappings/bulk-delete */
  async unmap(clientId: string, riskId: string, body: CmRiskMappingsRequest): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/risks/${riskId}/mappings/bulk-delete`,
      { method: 'POST', body }
    );
  }

  /** Get Client Risk Category — GET /controlmap/v1/clients/{client_id}/risk-categories/{risk_category_id} */
  async getCategory(clientId: string, riskCategoryId: string): Promise<CmRiskCategory> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/risk-categories/${riskCategoryId}`
    );
  }

  /** List Client Risk Departments — GET /controlmap/v1/clients/{client_id}/risks/departments */
  async listDepartments(clientId: string): Promise<CmListResponse<CmRiskDepartment>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/risks/departments`);
  }
}
