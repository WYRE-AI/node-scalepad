import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  CmClientHealth,
  CmClientReport,
  CmHealthListParams,
  CmSearchRequest,
  CmSignedUrl,
} from '../types/cmHealth.js';

/** ControlMap compliance health metrics and generated client reports. */
export class CmHealthResource {
  constructor(private readonly http: HttpClient) {}

  /** List Clients Compliance Health Metrics — GET /controlmap/v1/clients/health */
  async listHealth(params?: CmHealthListParams): Promise<CursorPaginatedResponse<CmClientHealth>> {
    return this.http.request('/controlmap/v1/clients/health', {
      params: params as Record<string, unknown>,
    });
  }

  /** Get Client Compliance Health Metrics — GET /controlmap/v1/clients/{client_id}/health */
  async getHealth(clientId: string): Promise<CmClientHealth> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/health`);
  }

  /** List Client Reports — POST /controlmap/v1/clients/{client_id}/reports */
  async listReports(
    clientId: string,
    body?: CmSearchRequest
  ): Promise<CursorPaginatedResponse<CmClientReport>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/reports`, {
      method: 'POST',
      body: body ?? {},
    });
  }

  /** Retrieve a signed URL to download a report — GET /controlmap/v1/clients/{client_id}/reports/{report_id}/signed-url */
  async getReportSignedUrl(clientId: string, reportId: string): Promise<CmSignedUrl> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/reports/${reportId}/signed-url`
    );
  }
}
