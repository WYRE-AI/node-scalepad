import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { CmSearchRequest, CmSummaryListParams } from '../types/cmHealth.js';
import type {
  CmCodeNameFilterParams,
  CmControl,
  CmControlCreateRequest,
  CmControlFamily,
  CmControlMappingsRequest,
  CmControlSet,
  CmControlSummary,
  CmControlUpdateRequest,
} from '../types/cmControls.js';

/** ControlMap client controls, control families, and control sets. */
export class CmControlsResource {
  constructor(private readonly http: HttpClient) {}

  /** Search Client Controls — POST /controlmap/v1/clients/{client_id}/controls/search */
  async search(
    clientId: string,
    body?: CmSearchRequest
  ): Promise<CursorPaginatedResponse<CmControl>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/controls/search`, {
      method: 'POST',
      body: body ?? {},
    });
  }

  /** Create Control — POST /controlmap/v1/clients/{client_id}/controls */
  async create(clientId: string, body: CmControlCreateRequest): Promise<CmControl> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/controls`, {
      method: 'POST',
      body,
    });
  }

  /** Get Control by ID — GET /controlmap/v1/clients/{client_id}/controls/{control_id} */
  async get(clientId: string, controlId: string): Promise<CmControl> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/controls/${controlId}`);
  }

  /** Partially Update Client Control — PATCH /controlmap/v1/clients/{client_id}/controls/{control_id} */
  async update(
    clientId: string,
    controlId: string,
    body: CmControlUpdateRequest
  ): Promise<CmControl> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/controls/${controlId}`, {
      method: 'PATCH',
      body,
    });
  }

  /** Delete Control — DELETE /controlmap/v1/clients/{client_id}/controls/{control_id} */
  async delete(clientId: string, controlId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/controls/${controlId}`,
      { method: 'DELETE' }
    );
  }

  /** Map Control to Related Items — POST /controlmap/v1/clients/{client_id}/controls/{control_id}/mappings */
  async map(clientId: string, controlId: string, body: CmControlMappingsRequest): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/controls/${controlId}/mappings`,
      { method: 'POST', body }
    );
  }

  /** Unmap Control from Related Items — POST /controlmap/v1/clients/{client_id}/controls/{control_id}/mappings/bulk-delete */
  async unmap(clientId: string, controlId: string, body: CmControlMappingsRequest): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/controls/${controlId}/mappings/bulk-delete`,
      { method: 'POST', body }
    );
  }

  /** List Clients Control Summaries — GET /controlmap/v1/clients/controls-summary */
  async listSummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmControlSummary>> {
    return this.http.request('/controlmap/v1/clients/controls-summary', {
      params: params as Record<string, unknown>,
    });
  }

  /** Client Control Summary — GET /controlmap/v1/clients/{client_id}/controls-summary */
  async getSummary(clientId: string): Promise<CmControlSummary> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/controls-summary`);
  }

  /** List Control Families — GET /controlmap/v1/clients/{client_id}/control-families */
  async listFamilies(
    clientId: string,
    params?: CmCodeNameFilterParams
  ): Promise<CursorPaginatedResponse<CmControlFamily>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/control-families`, {
      params: params as Record<string, unknown>,
    });
  }

  /** List Control Sets — GET /controlmap/v1/clients/{client_id}/control-sets */
  async listSets(
    clientId: string,
    params?: CmCodeNameFilterParams
  ): Promise<CursorPaginatedResponse<CmControlSet>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/control-sets`, {
      params: params as Record<string, unknown>,
    });
  }
}
