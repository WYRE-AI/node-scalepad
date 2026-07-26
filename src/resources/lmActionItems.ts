import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  LmActionItem,
  LmActionItemCompletionStatusPayload,
  LmActionItemCreatePayload,
  LmActionItemListParams,
  LmActionItemPinPayload,
  LmActionItemRepositionPayload,
  LmActionItemUpdatePayload,
} from '../types/lmActionItems.js';

/** Lifecycle Manager action items surface. */
export class LmActionItemsResource {
  constructor(private readonly http: HttpClient) {}

  async list(params?: LmActionItemListParams): Promise<CursorPaginatedResponse<LmActionItem>> {
    return this.http.request('/lifecycle-manager/v1/action-items', {
      params: params as Record<string, unknown>,
    });
  }

  async get(id: string): Promise<LmActionItem> {
    return this.http.request(`/lifecycle-manager/v1/action-items/${id}`);
  }

  async create(payload: LmActionItemCreatePayload): Promise<LmActionItem> {
    return this.http.request('/lifecycle-manager/v1/action-items', {
      method: 'POST',
      body: payload,
    });
  }

  async update(id: string, payload: LmActionItemUpdatePayload): Promise<LmActionItem> {
    return this.http.request(`/lifecycle-manager/v1/action-items/${id}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async delete(id: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/action-items/${id}`, { method: 'DELETE' });
  }

  async reposition(id: string, payload: LmActionItemRepositionPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/action-items/${id}/reposition`, {
      method: 'POST',
      body: payload,
    });
  }

  async updatePinStatus(id: string, payload: LmActionItemPinPayload): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/action-items/${id}/pin`, {
      method: 'PUT',
      body: payload,
    });
  }

  async updateCompletionStatus(
    id: string,
    payload: LmActionItemCompletionStatusPayload
  ): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/action-items/${id}/completion-status`, {
      method: 'PUT',
      body: payload,
    });
  }
}
