import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  CoreContract,
  CoreContractListParams,
  CoreIntegrationConfiguration,
  CoreIntegrationVendor,
  CoreIntegrationVendorListParams,
  CoreTicket,
  CoreTicketListParams,
} from '../types/coreService.js';

/**
 * Core service surface: integration configurations/vendors, contracts, and
 * tickets. Read-only.
 */
export class CoreServiceResource {
  constructor(private readonly http: HttpClient) {}

  async listIntegrationConfigurations(): Promise<{ data: CoreIntegrationConfiguration[] }> {
    return this.http.request('/core/v1/integrations/configurations');
  }

  async listIntegrationVendors(
    params?: CoreIntegrationVendorListParams
  ): Promise<CursorPaginatedResponse<CoreIntegrationVendor>> {
    return this.http.request('/core/v1/integrations/vendors', {
      params: params as Record<string, unknown>,
    });
  }

  async listContracts(
    params?: CoreContractListParams
  ): Promise<CursorPaginatedResponse<CoreContract>> {
    return this.http.request('/core/v1/service/contracts', {
      params: params as Record<string, unknown>,
    });
  }

  async getContract(id: string): Promise<CoreContract> {
    return this.http.request(`/core/v1/service/contracts/${id}`);
  }

  async listTickets(params?: CoreTicketListParams): Promise<CursorPaginatedResponse<CoreTicket>> {
    return this.http.request('/core/v1/service/tickets', {
      params: params as Record<string, unknown>,
    });
  }

  async getTicket(id: string): Promise<CoreTicket> {
    return this.http.request(`/core/v1/service/tickets/${id}`);
  }
}
