import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { LmActionItem } from '../types/lmActionItems.js';
import type {
  LmGoal,
  LmGoalCreateFromTemplatePayload,
  LmGoalCreatePayload,
  LmGoalListParams,
  LmGoalSchedulePayload,
  LmGoalStatusPayload,
  LmGoalTemplate,
  LmGoalTemplateListParams,
  LmGoalTemplatePayload,
  LmGoalUpdatePayload,
} from '../types/lmGoals.js';
import type { LmInitiative } from '../types/lmInitiatives.js';
import type { LmMeeting } from '../types/lmMeetings.js';

/**
 * Lifecycle Manager goals surface: goals, goal templates, and the meeting/
 * initiative/action-item attachments hanging off a goal.
 */
export class LmGoalsResource {
  constructor(private readonly http: HttpClient) {}

  async list(params?: LmGoalListParams): Promise<CursorPaginatedResponse<LmGoal>> {
    return this.http.request('/lifecycle-manager/v1/goals', {
      params: params as Record<string, unknown>,
    });
  }

  async get(id: string): Promise<LmGoal> {
    return this.http.request(`/lifecycle-manager/v1/goals/${id}`);
  }

  async create(payload: LmGoalCreatePayload): Promise<LmGoal> {
    return this.http.request('/lifecycle-manager/v1/goals', { method: 'POST', body: payload });
  }

  async update(id: string, payload: LmGoalUpdatePayload): Promise<LmGoal> {
    return this.http.request(`/lifecycle-manager/v1/goals/${id}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(id: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/goals/${id}`, { method: 'DELETE' });
  }

  async updateStatus(id: string, payload: LmGoalStatusPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/goals/${id}/status`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateSchedule(id: string, payload: LmGoalSchedulePayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/goals/${id}/schedule`, {
      method: 'PUT',
      body: payload,
    });
  }

  async createFromTemplate(
    goalTemplateId: string,
    payload: LmGoalCreateFromTemplatePayload
  ): Promise<LmGoal> {
    return this.http.request(
      `/lifecycle-manager/v1/goals/create-from/template/${goalTemplateId}`,
      { method: 'POST', body: payload }
    );
  }

  // --- Meetings ---

  async listMeetings(goalId: string): Promise<{ data: LmMeeting[] }> {
    return this.http.request(`/lifecycle-manager/v1/goals/${goalId}/meetings`);
  }

  async attachMeeting(goalId: string, meetingId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/goals/${goalId}/meetings/${meetingId}`, {
      method: 'POST',
    });
  }

  async detachMeeting(goalId: string, meetingId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/goals/${goalId}/meetings/${meetingId}`, {
      method: 'DELETE',
    });
  }

  // --- Initiatives ---

  async listInitiatives(goalId: string): Promise<{ data: LmInitiative[] }> {
    return this.http.request(`/lifecycle-manager/v1/goals/${goalId}/initiatives`);
  }

  async attachInitiative(goalId: string, initiativeId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/goals/${goalId}/initiatives/${initiativeId}`,
      { method: 'POST' }
    );
  }

  async detachInitiative(goalId: string, initiativeId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/goals/${goalId}/initiatives/${initiativeId}`,
      { method: 'DELETE' }
    );
  }

  // --- Action items ---

  async listActionItems(goalId: string): Promise<{ data: LmActionItem[] }> {
    return this.http.request(`/lifecycle-manager/v1/goals/${goalId}/action-items`);
  }

  async attachActionItem(goalId: string, actionItemId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/goals/${goalId}/action-items/${actionItemId}`,
      { method: 'POST' }
    );
  }

  async detachActionItem(goalId: string, actionItemId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/goals/${goalId}/action-items/${actionItemId}`,
      { method: 'DELETE' }
    );
  }

  // --- Templates ---

  async listTemplates(params?: LmGoalTemplateListParams): Promise<{ data: LmGoalTemplate[] }> {
    return this.http.request('/lifecycle-manager/v1/goal-templates', {
      params: params as Record<string, unknown>,
    });
  }

  async getTemplate(goalTemplateId: string): Promise<LmGoalTemplate> {
    return this.http.request(`/lifecycle-manager/v1/goal-templates/${goalTemplateId}`);
  }

  async createTemplate(payload: LmGoalTemplatePayload): Promise<LmGoalTemplate> {
    return this.http.request('/lifecycle-manager/v1/goal-templates', {
      method: 'POST',
      body: payload,
    });
  }

  async updateTemplate(
    goalTemplateId: string,
    payload: LmGoalTemplatePayload
  ): Promise<LmGoalTemplate> {
    return this.http.request(`/lifecycle-manager/v1/goal-templates/${goalTemplateId}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async deleteTemplate(goalTemplateId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/goal-templates/${goalTemplateId}`, {
      method: 'DELETE',
    });
  }
}
