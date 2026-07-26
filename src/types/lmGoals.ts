/**
 * Types for the Lifecycle Manager goals surface: goals, goal templates, and
 * the meeting/initiative/action-item attachments hanging off a goal.
 */
import type { CursorPaginationParams } from '../pagination.js';

export interface LmGoal {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  target_period?: unknown;
  client?: { id?: string; name?: string };
  [key: string]: unknown;
}

export interface LmGoalListParams extends CursorPaginationParams {
  'filter[client.id]'?: string;
  'filter[title]'?: string;
  'filter[status]'?: string;
  'filter[period.year]'?: string;
  'filter[period.half]'?: string;
  'filter[period.quarter]'?: string;
  sort?: string;
}

export interface LmGoalCreatePayload {
  client_key: string;
  title: string;
  description?: string;
  status?: string;
  target_period?: unknown;
}

export interface LmGoalUpdatePayload {
  title?: string;
  description?: string;
  description_json?: unknown;
  status?: string;
  target_period?: unknown;
}

export interface LmGoalStatusPayload {
  status: string;
}

export interface LmGoalSchedulePayload {
  target_period: unknown;
}

export interface LmGoalCreateFromTemplatePayload {
  title?: string;
  client_key: string;
}

export interface LmGoalTemplate {
  id: string;
  title?: string;
  [key: string]: unknown;
}

export interface LmGoalTemplateListParams {
  'filter[title]'?: string;
}

export interface LmGoalTemplatePayload {
  goal_template: Record<string, unknown>;
}
