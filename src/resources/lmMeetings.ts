import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { LmActionItem } from '../types/lmActionItems.js';
import type { LmGoal } from '../types/lmGoals.js';
import type { LmInitiative } from '../types/lmInitiatives.js';
import type {
  LmMeeting,
  LmMeetingCompletionStatusPayload,
  LmMeetingContactAttendeesPayload,
  LmMeetingCreatePayload,
  LmMeetingListParams,
  LmMeetingType,
  LmMeetingTypePayload,
  LmMeetingUpdatePayload,
  LmMeetingUserAttendeesPayload,
} from '../types/lmMeetings.js';

/**
 * Lifecycle Manager meetings surface: meetings (v1+v2), meeting types,
 * attendees, and the initiative/goal/action-item attachments hanging off a
 * meeting.
 */
export class LmMeetingsResource {
  constructor(private readonly http: HttpClient) {}

  async list(params?: LmMeetingListParams): Promise<CursorPaginatedResponse<LmMeeting>> {
    return this.http.request('/lifecycle-manager/v1/meetings', {
      params: params as Record<string, unknown>,
    });
  }

  async get(id: string): Promise<LmMeeting> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${id}`);
  }

  async create(payload: LmMeetingCreatePayload): Promise<LmMeeting> {
    return this.http.request('/lifecycle-manager/v1/meetings', { method: 'POST', body: payload });
  }

  async createV2(payload: LmMeetingCreatePayload): Promise<LmMeeting> {
    return this.http.request('/lifecycle-manager/v2/meetings', { method: 'POST', body: payload });
  }

  async update(id: string, payload: LmMeetingUpdatePayload): Promise<LmMeeting> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${id}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateV2(id: string, payload: LmMeetingUpdatePayload): Promise<LmMeeting> {
    return this.http.request(`/lifecycle-manager/v2/meetings/${id}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(id: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${id}`, { method: 'DELETE' });
  }

  async updateCompletionStatus(
    id: string,
    payload: LmMeetingCompletionStatusPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${id}/completion-status`, {
      method: 'PUT',
      body: payload,
    });
  }

  // --- Attendees ---

  async addUserAttendees(id: string, payload: LmMeetingUserAttendeesPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${id}/attendees/users`, {
      method: 'POST',
      body: payload,
    });
  }

  async removeUserAttendees(id: string, payload: LmMeetingUserAttendeesPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${id}/attendees/users/delete`, {
      method: 'POST',
      body: payload,
    });
  }

  async addContactAttendees(
    id: string,
    payload: LmMeetingContactAttendeesPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${id}/attendees/contacts`, {
      method: 'POST',
      body: payload,
    });
  }

  async removeContactAttendees(
    id: string,
    payload: LmMeetingContactAttendeesPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${id}/attendees/contacts/delete`, {
      method: 'POST',
      body: payload,
    });
  }

  // --- Initiatives ---

  async listInitiatives(meetingId: string): Promise<{ data: LmInitiative[] }> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${meetingId}/initiatives`);
  }

  async attachInitiative(meetingId: string, initiativeId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/meetings/${meetingId}/initiatives/${initiativeId}`,
      { method: 'POST' }
    );
  }

  async detachInitiative(meetingId: string, initiativeId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/meetings/${meetingId}/initiatives/${initiativeId}`,
      { method: 'DELETE' }
    );
  }

  // --- Goals ---

  async listGoals(meetingId: string): Promise<{ data: LmGoal[] }> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${meetingId}/goals`);
  }

  async attachGoal(meetingId: string, goalId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${meetingId}/goals/${goalId}`, {
      method: 'POST',
    });
  }

  async detachGoal(meetingId: string, goalId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${meetingId}/goals/${goalId}`, {
      method: 'DELETE',
    });
  }

  // --- Action items ---

  async listActionItems(meetingId: string): Promise<{ data: LmActionItem[] }> {
    return this.http.request(`/lifecycle-manager/v1/meetings/${meetingId}/action-items`);
  }

  async attachActionItem(meetingId: string, actionItemId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/meetings/${meetingId}/action-items/${actionItemId}`,
      { method: 'POST' }
    );
  }

  async detachActionItem(meetingId: string, actionItemId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/meetings/${meetingId}/action-items/${actionItemId}`,
      { method: 'DELETE' }
    );
  }

  // --- Meeting types ---

  async listMeetingTypes(): Promise<{ data: LmMeetingType[] }> {
    return this.http.request('/lifecycle-manager/v1/meeting-types');
  }

  async createMeetingType(payload: LmMeetingTypePayload): Promise<LmMeetingType> {
    return this.http.request('/lifecycle-manager/v1/meeting-types', {
      method: 'POST',
      body: payload,
    });
  }

  async updateMeetingType(
    meetingTypeId: string,
    payload: LmMeetingTypePayload
  ): Promise<LmMeetingType> {
    return this.http.request(`/lifecycle-manager/v1/meeting-types/${meetingTypeId}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async deleteMeetingType(meetingTypeId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/meeting-types/${meetingTypeId}`, {
      method: 'DELETE',
    });
  }
}
