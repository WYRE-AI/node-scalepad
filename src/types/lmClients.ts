/**
 * Types for the Lifecycle Manager clients surface: clients, contacts,
 * client groups, member/contact lookups, and active users.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmClient {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmClientListParams extends CursorPaginationParams {
  search?: string;
  sort?: string;
}

export interface LmContact {
  id: string;
  name?: string;
  email?: string;
  is_hidden?: boolean;
  client_id?: string;
  [key: string]: unknown;
}

export interface LmContactListParams extends CursorPaginationParams {
  'filter[client_id]'?: string;
  'filter[is_hidden]'?: string;
  sort?: string;
}

export interface LmContactHiddenStatusPayload {
  is_hidden: boolean;
}

export interface LmClientGroup {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmClientGroupLookupPayload {
  client_key: string;
}

export interface LmClientGroupAssignmentPayload {
  client_keys?: string[];
  user_keys?: string[];
}

/** Client member returned by the per-client members lookup. */
export interface LmMember {
  id: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

export interface LmLookupParams {
  search?: string;
}

export interface LmActiveUser {
  id: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}
