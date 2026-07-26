import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { CmSearchRequest, CmSummaryListParams } from '../types/cmHealth.js';
import type {
  CmGovernance,
  CmGovernanceCreateRequest,
  CmGovernanceMappingsRequest,
  CmGovernanceSummary,
  CmGovernanceUpdateRequest,
  CmPolicy,
  CmPolicyCreateRequest,
  CmPolicyMappingsRequest,
  CmPolicySection,
  CmPolicySectionUpsertRequest,
  CmPolicySummary,
  CmPolicyUpdateRequest,
  CmProcedure,
  CmProcedureCreateRequest,
  CmProcedureMappingsRequest,
  CmProcedureSummary,
  CmProcedureUpdateRequest,
} from '../types/cmPolicies.js';

/** ControlMap policies, procedures, and governance documents. */
export class CmPoliciesResource {
  constructor(private readonly http: HttpClient) {}

  // -------------------------------------------------------------------------
  // Policies
  // -------------------------------------------------------------------------

  /** Search Client Policies — POST /controlmap/v1/clients/{client_id}/policies/search */
  async searchPolicies(
    clientId: string,
    body?: CmSearchRequest
  ): Promise<CursorPaginatedResponse<CmPolicy>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/policies/search`, {
      method: 'POST',
      body: body ?? {},
    });
  }

  /** Create Client Policy — POST /controlmap/v1/clients/{client_id}/policies */
  async createPolicy(clientId: string, body: CmPolicyCreateRequest): Promise<CmPolicy> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/policies`, {
      method: 'POST',
      body,
    });
  }

  /** Get Client Policy — GET /controlmap/v1/clients/{client_id}/policies/{policy_id} */
  async getPolicy(clientId: string, policyId: string): Promise<CmPolicy> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/policies/${policyId}`);
  }

  /** Partially Update Client Policy — PATCH /controlmap/v1/clients/{client_id}/policies/{policy_id} */
  async updatePolicy(
    clientId: string,
    policyId: string,
    body: CmPolicyUpdateRequest
  ): Promise<CmPolicy> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/policies/${policyId}`, {
      method: 'PATCH',
      body,
    });
  }

  /** Delete Client Policy — DELETE /controlmap/v1/clients/{client_id}/policies/{policy_id} */
  async deletePolicy(clientId: string, policyId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/policies/${policyId}`,
      { method: 'DELETE' }
    );
  }

  /** Create or Update a policy section — PUT /controlmap/v1/clients/{client_id}/policies/{policy_id}/sections */
  async upsertPolicySection(
    clientId: string,
    policyId: string,
    body: CmPolicySectionUpsertRequest
  ): Promise<CmPolicySection> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/policies/${policyId}/sections`,
      { method: 'PUT', body }
    );
  }

  /** Delete Client Policy Section — DELETE /controlmap/v1/clients/{client_id}/policies/{policy_id}/sections/{section_id} */
  async deletePolicySection(clientId: string, policyId: string, sectionId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/policies/${policyId}/sections/${sectionId}`,
      { method: 'DELETE' }
    );
  }

  /** Map Policy to Objectives and Controls — POST /controlmap/v1/clients/{client_id}/policies/{policy_id}/mappings */
  async mapPolicy(clientId: string, policyId: string, body: CmPolicyMappingsRequest): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/policies/${policyId}/mappings`,
      { method: 'POST', body }
    );
  }

  /** Unmap Policy from Objectives and Controls — POST /controlmap/v1/clients/{client_id}/policies/{policy_id}/mappings/bulk-delete */
  async unmapPolicy(
    clientId: string,
    policyId: string,
    body: CmPolicyMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/policies/${policyId}/mappings/bulk-delete`,
      { method: 'POST', body }
    );
  }

  /** Clients Policy Overview — GET /controlmap/v1/clients/policies-summary */
  async listPolicySummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmPolicySummary>> {
    return this.http.request('/controlmap/v1/clients/policies-summary', {
      params: params as Record<string, unknown>,
    });
  }

  // -------------------------------------------------------------------------
  // Procedures
  // -------------------------------------------------------------------------

  /** Search Client Procedures — POST /controlmap/v1/clients/{client_id}/procedures/search */
  async searchProcedures(
    clientId: string,
    body?: CmSearchRequest
  ): Promise<CursorPaginatedResponse<CmProcedure>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/procedures/search`, {
      method: 'POST',
      body: body ?? {},
    });
  }

  /** Create Client Procedure — POST /controlmap/v1/clients/{client_id}/procedures */
  async createProcedure(clientId: string, body: CmProcedureCreateRequest): Promise<CmProcedure> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/procedures`, {
      method: 'POST',
      body,
    });
  }

  /** Get Client Procedure — GET /controlmap/v1/clients/{client_id}/procedures/{procedure_id} */
  async getProcedure(clientId: string, procedureId: string): Promise<CmProcedure> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/procedures/${procedureId}`);
  }

  /** Partially Update Client Procedure — PATCH /controlmap/v1/clients/{client_id}/procedures/{procedure_id} */
  async updateProcedure(
    clientId: string,
    procedureId: string,
    body: CmProcedureUpdateRequest
  ): Promise<CmProcedure> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/procedures/${procedureId}`, {
      method: 'PATCH',
      body,
    });
  }

  /** Delete Client Procedure — DELETE /controlmap/v1/clients/{client_id}/procedures/{procedure_id} */
  async deleteProcedure(clientId: string, procedureId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/procedures/${procedureId}`,
      { method: 'DELETE' }
    );
  }

  /** Map Procedure to Related Items — POST /controlmap/v1/clients/{client_id}/procedures/{procedure_id}/mappings */
  async mapProcedure(
    clientId: string,
    procedureId: string,
    body: CmProcedureMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/procedures/${procedureId}/mappings`,
      { method: 'POST', body }
    );
  }

  /** Unmap Procedure from Related Items — POST /controlmap/v1/clients/{client_id}/procedures/{procedure_id}/mappings/bulk-delete */
  async unmapProcedure(
    clientId: string,
    procedureId: string,
    body: CmProcedureMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/procedures/${procedureId}/mappings/bulk-delete`,
      { method: 'POST', body }
    );
  }

  /** Clients Procedure Overview — GET /controlmap/v1/clients/procedures-summary */
  async listProcedureSummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmProcedureSummary>> {
    return this.http.request('/controlmap/v1/clients/procedures-summary', {
      params: params as Record<string, unknown>,
    });
  }

  // -------------------------------------------------------------------------
  // Governance
  // -------------------------------------------------------------------------

  /** Search Client Governance — POST /controlmap/v1/clients/{client_id}/governance/search */
  async searchGovernance(
    clientId: string,
    body?: CmSearchRequest
  ): Promise<CursorPaginatedResponse<CmGovernance>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/governance/search`, {
      method: 'POST',
      body: body ?? {},
    });
  }

  /** Create Client Governance — POST /controlmap/v1/clients/{client_id}/governance */
  async createGovernance(clientId: string, body: CmGovernanceCreateRequest): Promise<CmGovernance> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/governance`, {
      method: 'POST',
      body,
    });
  }

  /** Get Client Governance — GET /controlmap/v1/clients/{client_id}/governance/{governance_id} */
  async getGovernance(clientId: string, governanceId: string): Promise<CmGovernance> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/governance/${governanceId}`);
  }

  /** Partially Update Client Governance — PATCH /controlmap/v1/clients/{client_id}/governance/{governance_id} */
  async updateGovernance(
    clientId: string,
    governanceId: string,
    body: CmGovernanceUpdateRequest
  ): Promise<CmGovernance> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/governance/${governanceId}`, {
      method: 'PATCH',
      body,
    });
  }

  /** Delete Client Governance — DELETE /controlmap/v1/clients/{client_id}/governance/{governance_id} */
  async deleteGovernance(clientId: string, governanceId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/governance/${governanceId}`,
      { method: 'DELETE' }
    );
  }

  /** Map Governance to Related Items — POST /controlmap/v1/clients/{client_id}/governance/{governance_id}/mappings */
  async mapGovernance(
    clientId: string,
    governanceId: string,
    body: CmGovernanceMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/governance/${governanceId}/mappings`,
      { method: 'POST', body }
    );
  }

  /** Unmap Governance from Related Items — POST /controlmap/v1/clients/{client_id}/governance/{governance_id}/mappings/bulk-delete */
  async unmapGovernance(
    clientId: string,
    governanceId: string,
    body: CmGovernanceMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/governance/${governanceId}/mappings/bulk-delete`,
      { method: 'POST', body }
    );
  }

  /** Clients Governance Overview — GET /controlmap/v1/clients/governance-summary */
  async listGovernanceSummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmGovernanceSummary>> {
    return this.http.request('/controlmap/v1/clients/governance-summary', {
      params: params as Record<string, unknown>,
    });
  }
}
