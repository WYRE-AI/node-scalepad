import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  CoreClient,
  CoreClientListParams,
  CoreContact,
  CoreContactListParams,
  CoreMember,
  CoreMemberListParams,
  CoreOpportunity,
  CoreOpportunityListParams,
  CoreSearchBody,
  CoreSite,
  CoreSiteListParams,
} from '../types/coreClients.js';

/**
 * Core clients surface: clients, contacts, members, opportunities, and sites.
 * Read-only; List Contacts and List Members are POST-based searches.
 */
export class CoreClientsResource {
  constructor(private readonly http: HttpClient) {}

  async listClients(
    params?: CoreClientListParams
  ): Promise<CursorPaginatedResponse<CoreClient>> {
    return this.http.request('/core/v1/clients', {
      params: params as Record<string, unknown>,
    });
  }

  async getClient(id: string): Promise<CoreClient> {
    return this.http.request(`/core/v1/clients/${id}`);
  }

  async listContacts(
    params?: CoreContactListParams,
    body?: CoreSearchBody
  ): Promise<CursorPaginatedResponse<CoreContact>> {
    return this.http.request('/core/v1/contacts', {
      method: 'POST',
      params: params as Record<string, unknown>,
      body,
    });
  }

  async getContact(id: string): Promise<CoreContact> {
    return this.http.request(`/core/v1/contacts/${id}`);
  }

  async listMembers(
    params?: CoreMemberListParams,
    body?: CoreSearchBody
  ): Promise<CursorPaginatedResponse<CoreMember>> {
    return this.http.request('/core/v1/members', {
      method: 'POST',
      params: params as Record<string, unknown>,
      body,
    });
  }

  async getMember(id: string): Promise<CoreMember> {
    return this.http.request(`/core/v1/members/${id}`);
  }

  async listOpportunities(
    params?: CoreOpportunityListParams
  ): Promise<CursorPaginatedResponse<CoreOpportunity>> {
    return this.http.request('/core/v1/opportunities', {
      params: params as Record<string, unknown>,
    });
  }

  async getOpportunity(id: string): Promise<CoreOpportunity> {
    return this.http.request(`/core/v1/opportunities/${id}`);
  }

  async listSites(params?: CoreSiteListParams): Promise<CursorPaginatedResponse<CoreSite>> {
    return this.http.request('/core/v1/sites', {
      params: params as Record<string, unknown>,
    });
  }

  async getSite(id: string): Promise<CoreSite> {
    return this.http.request(`/core/v1/sites/${id}`);
  }
}
