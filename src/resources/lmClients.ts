import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  LmActiveUser,
  LmClient,
  LmClientGroup,
  LmClientGroupAssignmentPayload,
  LmClientGroupLookupPayload,
  LmClientListParams,
  LmContact,
  LmContactHiddenStatusPayload,
  LmContactListParams,
  LmLookupParams,
  LmMember,
} from '../types/lmClients.js';

/**
 * Lifecycle Manager clients surface: clients, contacts, client groups,
 * member/contact lookups, and active users.
 */
export class LmClientsResource {
  constructor(private readonly http: HttpClient) {}

  async listClients(params?: LmClientListParams): Promise<CursorPaginatedResponse<LmClient>> {
    return this.http.request('/lifecycle-manager/v1/clients', {
      params: params as Record<string, unknown>,
    });
  }

  async lookupClients(params?: LmClientListParams): Promise<CursorPaginatedResponse<LmClient>> {
    return this.http.request('/lifecycle-manager/v1/clients/lookup', {
      params: params as Record<string, unknown>,
    });
  }

  async lookupClientMembers(
    clientId: string,
    params?: LmLookupParams
  ): Promise<{ data: LmMember[] }> {
    return this.http.request(`/lifecycle-manager/v1/clients/${clientId}/members/lookup`, {
      params: params as Record<string, unknown>,
    });
  }

  async lookupClientContacts(
    clientId: string,
    params?: LmLookupParams
  ): Promise<{ data: LmContact[] }> {
    return this.http.request(`/lifecycle-manager/v1/clients/${clientId}/contacts/lookup`, {
      params: params as Record<string, unknown>,
    });
  }

  async listContacts(params?: LmContactListParams): Promise<CursorPaginatedResponse<LmContact>> {
    return this.http.request('/lifecycle-manager/v1/contacts', {
      params: params as Record<string, unknown>,
    });
  }

  async getContact(contactId: string): Promise<LmContact> {
    return this.http.request(`/lifecycle-manager/v1/contacts/${contactId}`);
  }

  async updateContactHiddenStatus(
    contactId: string,
    payload: LmContactHiddenStatusPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/contacts/${contactId}/hidden-status`, {
      method: 'PUT',
      body: payload,
    });
  }

  async listClientGroups(): Promise<{ data: LmClientGroup[] }> {
    return this.http.request('/lifecycle-manager/v1/client-groups');
  }

  async getClientGroup(clientGroupId: string): Promise<LmClientGroup> {
    return this.http.request(`/lifecycle-manager/v1/client-groups/${clientGroupId}`);
  }

  async lookupClientGroups(payload: LmClientGroupLookupPayload): Promise<{ data: LmClientGroup[] }> {
    return this.http.request('/lifecycle-manager/v1/clients/client-groups/lookup', {
      method: 'POST',
      body: payload,
    });
  }

  async assignClientGroup(
    clientGroupId: string,
    payload: LmClientGroupAssignmentPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/client-groups/${clientGroupId}/assignments`, {
      method: 'POST',
      body: payload,
    });
  }

  async unassignClientGroup(
    clientGroupId: string,
    payload: LmClientGroupAssignmentPayload
  ): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/client-groups/${clientGroupId}/assignments/unassign`,
      { method: 'POST', body: payload }
    );
  }

  async listActiveUsers(): Promise<{ data: LmActiveUser[] }> {
    return this.http.request('/lifecycle-manager/v1/active-users');
  }
}
