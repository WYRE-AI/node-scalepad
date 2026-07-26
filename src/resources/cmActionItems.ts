import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  CmDocument,
  CmDocumentUploadRequest,
  CmSearchRequest,
  CmSignedUrl,
  CmSignedUrlRequest,
  CmSummaryListParams,
} from '../types/cmHealth.js';
import type {
  CmActionItem,
  CmActionItemCreateRequest,
  CmActionItemMappingsRequest,
  CmActionItemSummary,
  CmActionItemUpdateRequest,
} from '../types/cmActionItems.js';

/** ControlMap action items (remediation tasks). */
export class CmActionItemsResource {
  constructor(private readonly http: HttpClient) {}

  /** Search Client Action Items — POST /controlmap/v1/clients/{client_id}/action-items/search */
  async search(
    clientId: string,
    body?: CmSearchRequest
  ): Promise<CursorPaginatedResponse<CmActionItem>> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/action-items/search`, {
      method: 'POST',
      body: body ?? {},
    });
  }

  /** Create a new action item — POST /controlmap/v1/clients/{client_id}/action-items */
  async create(clientId: string, body: CmActionItemCreateRequest): Promise<CmActionItem> {
    return this.http.request(`/controlmap/v1/clients/${clientId}/action-items`, {
      method: 'POST',
      body,
    });
  }

  /** Get Action Item — GET /controlmap/v1/clients/{client_id}/action-items/{action_item_id} */
  async get(clientId: string, actionItemId: string): Promise<CmActionItem> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/action-items/${actionItemId}`
    );
  }

  /** Partially update an action item — PATCH /controlmap/v1/clients/{client_id}/action-items/{action_item_id} */
  async update(
    clientId: string,
    actionItemId: string,
    body: CmActionItemUpdateRequest
  ): Promise<CmActionItem> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/action-items/${actionItemId}`,
      { method: 'PATCH', body }
    );
  }

  /** Delete Action Item — DELETE /controlmap/v1/clients/{client_id}/action-items/{action_item_id} */
  async delete(clientId: string, actionItemId: string): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/action-items/${actionItemId}`,
      { method: 'DELETE' }
    );
  }

  /** Map Action Item to Related Items — POST /controlmap/v1/clients/{client_id}/action-items/{action_item_id}/mappings */
  async map(
    clientId: string,
    actionItemId: string,
    body: CmActionItemMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/action-items/${actionItemId}/mappings`,
      { method: 'POST', body }
    );
  }

  /** Unmap Action Item from Related Items — POST /controlmap/v1/clients/{client_id}/action-items/{action_item_id}/mappings/bulk-delete */
  async unmap(
    clientId: string,
    actionItemId: string,
    body: CmActionItemMappingsRequest
  ): Promise<void> {
    await this.http.request<void>(
      `/controlmap/v1/clients/${clientId}/action-items/${actionItemId}/mappings/bulk-delete`,
      { method: 'POST', body }
    );
  }

  /** List Client Action Items Summary — GET /controlmap/v1/clients/action-items-summary */
  async listSummaries(
    params?: CmSummaryListParams
  ): Promise<CursorPaginatedResponse<CmActionItemSummary>> {
    return this.http.request('/controlmap/v1/clients/action-items-summary', {
      params: params as Record<string, unknown>,
    });
  }

  /**
   * Upload Document to Action Item — POST /controlmap/v1/clients/{client_id}/action-items/{action_item_id}/documents
   *
   * The API accepts multipart uploads up to 10 MB; prefer the signed-URL flow
   * ({@link createDocumentSignedUrl}) for SDK use.
   */
  async uploadDocument(
    clientId: string,
    actionItemId: string,
    body: CmDocumentUploadRequest
  ): Promise<CmDocument> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/action-items/${actionItemId}/documents`,
      { method: 'POST', body }
    );
  }

  /** Generate Signed URLs for Action Item — POST /controlmap/v1/clients/{client_id}/action-items/{action_item_id}/documents/signed-url */
  async createDocumentSignedUrl(
    clientId: string,
    actionItemId: string,
    body: CmSignedUrlRequest
  ): Promise<CmSignedUrl> {
    return this.http.request(
      `/controlmap/v1/clients/${clientId}/action-items/${actionItemId}/documents/signed-url`,
      { method: 'POST', body }
    );
  }
}
