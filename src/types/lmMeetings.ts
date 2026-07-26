/**
 * Types for the Lifecycle Manager meetings surface: meetings (v1+v2),
 * meeting types, attendees, and the initiative/goal/action-item attachments
 * hanging off a meeting.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmMeeting {
  id: string;
  title?: string;
  type?: string;
  starts_at?: string;
  ends_at?: string;
  is_completed?: boolean;
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface LmMeetingListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
}

export interface LmMeetingCreatePayload {
  client_key: string;
  title: string;
  type?: string;
  starts_at?: string;
  ends_at?: string;
  agenda_json?: unknown;
}

export interface LmMeetingUpdatePayload {
  title?: string;
  type?: string;
  starts_at?: string;
  ends_at?: string;
  agenda_json?: unknown;
}

export interface LmMeetingCompletionStatusPayload {
  is_completed: boolean;
}

export interface LmMeetingUserAttendeesPayload {
  user_keys: string[];
}

export interface LmMeetingContactAttendeesPayload {
  contact_keys: string[];
}

export interface LmMeetingType {
  id: string;
  label?: string;
  [key: string]: unknown;
}

export interface LmMeetingTypePayload {
  label: string;
}
