import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { LmActionItem } from '../types/lmActionItems.js';
import type { LmGoal } from '../types/lmGoals.js';
import type {
  LmInitiative,
  LmInitiativeAssetsPayload,
  LmInitiativeAssignedUserPayload,
  LmInitiativeBudgetPayload,
  LmInitiativeCreatePayload,
  LmInitiativeFieldValuesPayload,
  LmInitiativeListParams,
  LmInitiativeOpportunity,
  LmInitiativePriorityPayload,
  LmInitiativeQuote,
  LmInitiativeRecurringPayload,
  LmInitiativeSchedulePayload,
  LmInitiativeStatusPayload,
  LmInitiativeTemplate,
  LmInitiativeTemplateListParams,
  LmInitiativeTemplatePayload,
  LmInitiativeTicket,
  LmInitiativeUpdatePayload,
  LmRoadmapExportPayload,
} from '../types/lmInitiatives.js';
import type { LmMeeting } from '../types/lmMeetings.js';

/**
 * Lifecycle Manager initiatives surface: initiatives (v1+v2), initiative
 * templates, roadmap exports, and the ticket/opportunity/meeting/goal/
 * action-item/asset attachments hanging off an initiative.
 */
export class LmInitiativesResource {
  constructor(private readonly http: HttpClient) {}

  async list(params?: LmInitiativeListParams): Promise<CursorPaginatedResponse<LmInitiative>> {
    return this.http.request('/lifecycle-manager/v1/initiatives', {
      params: params as Record<string, unknown>,
    });
  }

  async listV2(params?: LmInitiativeListParams): Promise<CursorPaginatedResponse<LmInitiative>> {
    return this.http.request('/lifecycle-manager/v2/initiatives', {
      params: params as Record<string, unknown>,
    });
  }

  async get(id: string): Promise<LmInitiative> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${id}`);
  }

  async create(payload: LmInitiativeCreatePayload): Promise<LmInitiative> {
    return this.http.request('/lifecycle-manager/v1/initiatives', {
      method: 'POST',
      body: payload,
    });
  }

  async update(id: string, payload: LmInitiativeUpdatePayload): Promise<LmInitiative> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${id}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(id: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${id}`, { method: 'DELETE' });
  }

  async updateStatus(id: string, payload: LmInitiativeStatusPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${id}/status`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateSchedule(id: string, payload: LmInitiativeSchedulePayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${id}/schedule`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateRecurringInvestments(
    id: string,
    payload: LmInitiativeRecurringPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${id}/recurring`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updatePriority(id: string, payload: LmInitiativePriorityPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${id}/priority`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateOneTimeInvestments(id: string, payload: LmInitiativeBudgetPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${id}/budget`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateAssignedUser(
    initiativeId: string,
    payload: LmInitiativeAssignedUserPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/assigned-user`, {
      method: 'PUT',
      body: payload,
    });
  }

  // --- Linked PSA ticket ---

  async getTicket(initiativeId: string): Promise<LmInitiativeTicket> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/ticket`);
  }

  async createTicket(
    initiativeId: string,
    payload: LmInitiativeFieldValuesPayload
  ): Promise<LmInitiativeTicket> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/ticket`, {
      method: 'POST',
      body: payload,
    });
  }

  async detachTicket(initiativeId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/ticket`, {
      method: 'DELETE',
    });
  }

  // --- Linked PSA opportunity ---

  async getOpportunity(initiativeId: string): Promise<LmInitiativeOpportunity> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/opportunity`);
  }

  async createOpportunity(
    initiativeId: string,
    payload: LmInitiativeFieldValuesPayload
  ): Promise<LmInitiativeOpportunity> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/opportunity`, {
      method: 'POST',
      body: payload,
    });
  }

  async deleteOpportunity(initiativeId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/opportunity`, {
      method: 'DELETE',
    });
  }

  async attachOpportunity(initiativeId: string, opportunityId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/initiatives/${initiativeId}/opportunities/${opportunityId}`,
      { method: 'POST' }
    );
  }

  // --- Meetings ---

  async listMeetings(initiativeId: string): Promise<{ data: LmMeeting[] }> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/meetings`);
  }

  async attachMeeting(initiativeId: string, meetingId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/initiatives/${initiativeId}/meetings/${meetingId}`,
      { method: 'PUT' }
    );
  }

  async detachMeeting(initiativeId: string, meetingId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/initiatives/${initiativeId}/meetings/${meetingId}`,
      { method: 'DELETE' }
    );
  }

  // --- Goals ---

  async listGoals(initiativeId: string): Promise<{ data: LmGoal[] }> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/goals`);
  }

  async attachGoal(initiativeId: string, goalId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/goals/${goalId}`, {
      method: 'POST',
    });
  }

  async detachGoal(initiativeId: string, goalId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/goals/${goalId}`, {
      method: 'DELETE',
    });
  }

  // --- Action items ---

  async listActionItems(initiativeId: string): Promise<{ data: LmActionItem[] }> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/action-items`);
  }

  async attachActionItem(initiativeId: string, actionItemId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/initiatives/${initiativeId}/action-items/${actionItemId}`,
      { method: 'POST' }
    );
  }

  async detachActionItem(initiativeId: string, actionItemId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/initiatives/${initiativeId}/action-items/${actionItemId}`,
      { method: 'DELETE' }
    );
  }

  // --- Quotes + PDF ---

  async listQuotes(initiativeId: string): Promise<{ data: LmInitiativeQuote[] }> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/quotes`);
  }

  async downloadPdf(initiativeId: string): Promise<ArrayBuffer> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/pdf`);
  }

  // --- Assets ---

  async attachAssets(initiativeId: string, payload: LmInitiativeAssetsPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/assets`, {
      method: 'PUT',
      body: payload,
    });
  }

  async detachAssets(initiativeId: string, payload: LmInitiativeAssetsPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/initiatives/${initiativeId}/assets/detach`, {
      method: 'POST',
      body: payload,
    });
  }

  // --- Templates ---

  async listTemplates(
    params?: LmInitiativeTemplateListParams
  ): Promise<CursorPaginatedResponse<LmInitiativeTemplate>> {
    return this.http.request('/lifecycle-manager/v1/initiative-templates', {
      params: params as Record<string, unknown>,
    });
  }

  async getTemplate(initiativeTemplateId: string): Promise<LmInitiativeTemplate> {
    return this.http.request(`/lifecycle-manager/v1/initiative-templates/${initiativeTemplateId}`);
  }

  async createTemplate(payload: LmInitiativeTemplatePayload): Promise<LmInitiativeTemplate> {
    return this.http.request('/lifecycle-manager/v1/initiative-templates', {
      method: 'POST',
      body: payload,
    });
  }

  async updateTemplate(
    initiativeTemplateId: string,
    payload: LmInitiativeTemplatePayload
  ): Promise<LmInitiativeTemplate> {
    return this.http.request(
      `/lifecycle-manager/v1/initiative-templates/${initiativeTemplateId}`,
      { method: 'PUT', body: payload }
    );
  }

  async deleteTemplate(initiativeTemplateId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/initiative-templates/${initiativeTemplateId}`,
      { method: 'DELETE' }
    );
  }

  async duplicateTemplate(initiativeTemplateId: string): Promise<LmInitiativeTemplate> {
    return this.http.request(
      `/lifecycle-manager/v1/initiative-templates/${initiativeTemplateId}/duplicate`,
      { method: 'POST' }
    );
  }

  async applyTemplate(initiativeId: string, initiativeTemplateId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/initiatives/${initiativeId}/template/${initiativeTemplateId}/apply`,
      { method: 'POST' }
    );
  }

  // --- Roadmap exports ---

  async generateRoadmapSpreadsheet(payload: LmRoadmapExportPayload): Promise<ArrayBuffer> {
    return this.http.request('/lifecycle-manager/v1/roadmap/spreadsheet', {
      method: 'POST',
      body: payload,
    });
  }

  async generateRoadmapPdf(payload: LmRoadmapExportPayload): Promise<ArrayBuffer> {
    return this.http.request('/lifecycle-manager/v1/roadmap/pdf', {
      method: 'POST',
      body: payload,
    });
  }

  async generateRoadmapCsv(payload: LmRoadmapExportPayload): Promise<string> {
    return this.http.request('/lifecycle-manager/v1/roadmap/csv', {
      method: 'POST',
      body: payload,
    });
  }
}
