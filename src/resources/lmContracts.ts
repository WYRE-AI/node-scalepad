import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  LmContract,
  LmContractAssetsPayload,
  LmContractCreatePayload,
  LmContractListParams,
  LmContractUpdatePayload,
} from '../types/lmContracts.js';

/** Lifecycle Manager contracts (agreements) surface. */
export class LmContractsResource {
  constructor(private readonly http: HttpClient) {}

  async list(params?: LmContractListParams): Promise<CursorPaginatedResponse<LmContract>> {
    return this.http.request('/lifecycle-manager/v1/contracts', {
      params: params as Record<string, unknown>,
    });
  }

  async get(id: string): Promise<LmContract> {
    return this.http.request(`/lifecycle-manager/v1/contracts/${id}`);
  }

  async create(payload: LmContractCreatePayload): Promise<LmContract> {
    return this.http.request('/lifecycle-manager/v1/contracts', {
      method: 'POST',
      body: payload,
    });
  }

  async update(id: string, payload: LmContractUpdatePayload): Promise<LmContract> {
    return this.http.request(`/lifecycle-manager/v1/contracts/${id}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(id: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/contracts/${id}`, { method: 'DELETE' });
  }

  async attachAssets(contractId: string, payload: LmContractAssetsPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/contracts/${contractId}/assets`, {
      method: 'PUT',
      body: payload,
    });
  }

  async detachAssets(contractId: string, payload: LmContractAssetsPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/contracts/${contractId}/assets/delete`, {
      method: 'POST',
      body: payload,
    });
  }
}
