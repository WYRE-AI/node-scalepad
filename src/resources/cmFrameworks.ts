import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { CmSearchRequest, CmSummaryListParams } from '../types/cmHealth.js';
import type { CmObjective, CmObjectiveSummary } from '../types/cmFrameworks.js';

/** ControlMap framework objectives and objective rollups. */
export class CmFrameworksResource {
  constructor(private readonly http: HttpClient) {}

  /** Search Client Objectives — POST /controlmap/v1/clients/{client_id}/frameworks/{framework_id}/objectives/search */
  async searchObjectives(
    clientId: string,
    frameworkId: string,
    body?: CmSearchRequest
  ): Promise<CursorPaginatedResponse<CmObjective>> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/frameworks/${frameworkId}/objectives/search`,
      { method: 'POST', body: body ?? {} }
    );
  }

  /** Get Client Objective — GET /controlmap/v1/clients/{client_id}/frameworks/{framework_id}/objectives/{objective_id} */
  async getObjective(
    clientId: string,
    frameworkId: string,
    objectiveId: string
  ): Promise<CmObjective> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/frameworks/${frameworkId}/objectives/${objectiveId}`
    );
  }

  /** Client Objective Summary — GET /controlmap/v1/clients/{client_id}/frameworks/objectives/summary */
  async getObjectiveSummary(clientId: string): Promise<CmObjectiveSummary> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/frameworks/objectives/summary`
    );
  }

  /** Clients Objective Overview — GET /controlmap/v1/clients/frameworks/objectives/summary */
  async listObjectiveSummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmObjectiveSummary>> {
    return this.http.request('/controlmap/v1/clients/frameworks/objectives/summary', {
      params: params as Record<string, unknown>,
    });
  }
}
