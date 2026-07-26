import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  LmCreateFieldsParams,
  LmEnrollmentToken,
  LmEnrollmentTokenCreatePayload,
  LmInsight,
  LmNote,
  LmNoteArchiveStatusPayload,
  LmNoteCreatePayload,
  LmNoteListParams,
  LmNoteUpdatePayload,
  LmOpportunity,
  LmOpportunityCreateFields,
  LmOpportunityListParams,
  LmSaasUtilizationSummary,
  LmTicketCreateFields,
  LmUserIdentity,
  LmUserUiState,
  LmUserUiStatePayload,
} from '../types/lmWorkspace.js';

/**
 * Lifecycle Manager workspace surface: user identity, PSA create-fields,
 * opportunities, notes, UI states, insights, and SaaS management.
 */
export class LmWorkspaceResource {
  constructor(private readonly http: HttpClient) {}

  async getUserIdentity(): Promise<LmUserIdentity> {
    return this.http.request('/lifecycle-manager/v1/user/identity');
  }

  async getTicketCreateFields(params?: LmCreateFieldsParams): Promise<LmTicketCreateFields> {
    return this.http.request('/lifecycle-manager/v1/tickets/create-fields', {
      params: params as Record<string, unknown>,
    });
  }

  async getOpportunityCreateFields(
    params?: LmCreateFieldsParams
  ): Promise<LmOpportunityCreateFields> {
    return this.http.request('/lifecycle-manager/v1/opportunities/create-fields', {
      params: params as Record<string, unknown>,
    });
  }

  async listOpportunities(params?: LmOpportunityListParams): Promise<{ data: LmOpportunity[] }> {
    return this.http.request('/lifecycle-manager/v1/opportunities', {
      params: params as Record<string, unknown>,
    });
  }

  // --- Notes ---

  async listNotes(params?: LmNoteListParams): Promise<CursorPaginatedResponse<LmNote>> {
    return this.http.request('/lifecycle-manager/v1/notes', {
      params: params as Record<string, unknown>,
    });
  }

  async getNote(id: string): Promise<LmNote> {
    return this.http.request(`/lifecycle-manager/v1/notes/${id}`);
  }

  async createNote(payload: LmNoteCreatePayload): Promise<LmNote> {
    return this.http.request('/lifecycle-manager/v1/notes', { method: 'POST', body: payload });
  }

  async updateNote(id: string, payload: LmNoteUpdatePayload): Promise<LmNote> {
    return this.http.request(`/lifecycle-manager/v1/notes/${id}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async deleteNote(id: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/notes/${id}`, { method: 'DELETE' });
  }

  async updateNoteArchiveStatus(id: string, payload: LmNoteArchiveStatusPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/notes/${id}/archive-status`, {
      method: 'PUT',
      body: payload,
    });
  }

  // --- User UI states ---

  async getUserUiState(stateKey: string): Promise<LmUserUiState> {
    return this.http.request(`/lifecycle-manager/v1/user-ui-states/${stateKey}`);
  }

  async putUserUiState(stateKey: string, payload: LmUserUiStatePayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/user-ui-states/${stateKey}`, {
      method: 'PUT',
      body: payload,
    });
  }

  // --- Insights + SaaS management ---

  async listInsights(): Promise<{ data: LmInsight[] }> {
    return this.http.request('/lifecycle-manager/v1/insights');
  }

  async createEnrollmentToken(
    clientId: string,
    payload?: LmEnrollmentTokenCreatePayload
  ): Promise<LmEnrollmentToken> {
    return this.http.request(
      `/lifecycle-manager/v1/saas-management/clients/${clientId}/enrollment-tokens`,
      { method: 'POST', body: payload }
    );
  }

  async getSaasUtilizationSummary(clientId: string): Promise<LmSaasUtilizationSummary> {
    return this.http.request(
      `/lifecycle-manager/v1/saas-management/clients/${clientId}/saas-utilization/summary`
    );
  }
}
