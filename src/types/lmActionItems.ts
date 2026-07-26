/**
 * Types for the Lifecycle Manager action items surface.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmActionItem {
  id: string;
  description?: string;
  is_completed?: boolean;
  is_pinned?: boolean;
  due_at?: string;
  assigned_user_ids?: string[];
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface LmActionItemListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[is_completed]'?: string;
  'filter[is_overdue]'?: string;
  'filter[assigned_user_ids]'?: string;
  'filter[created_by_user_id]'?: string;
  'filter[is_unassigned]'?: string;
  sort?: string;
}

export interface LmActionItemCreatePayload {
  client_key: string;
  description?: string;
  description_json?: unknown;
  assigned_user_ids?: string[];
  due_at?: string;
}

export interface LmActionItemUpdatePayload {
  update_payload: Record<string, unknown>;
}

export interface LmActionItemRepositionPayload {
  before_id?: string;
  after_id?: string;
}

export interface LmActionItemPinPayload {
  is_pinned: boolean;
}

export interface LmActionItemCompletionStatusPayload {
  is_completed: boolean;
}
