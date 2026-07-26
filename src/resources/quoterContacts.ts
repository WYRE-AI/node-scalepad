import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { QuoterFieldsParams } from '../types/quoterCatalog.js';
import type {
  QuoterContact,
  QuoterContactCreateRequest,
  QuoterContactListParams,
  QuoterContactUpdateRequest,
} from '../types/quoterContacts.js';

/** Quoter contacts (billing/shipping people quotes are addressed to). */
export class QuoterContactsResource {
  constructor(private readonly http: HttpClient) {}

  /** List Contacts — GET /v1/contacts */
  async list(params?: QuoterContactListParams): Promise<CursorPaginatedResponse<QuoterContact>> {
    return this.http.request('/v1/contacts', { params: params as Record<string, unknown> });
  }

  /** Create Contact — POST /v1/contacts */
  async create(body: QuoterContactCreateRequest, params?: QuoterFieldsParams): Promise<QuoterContact> {
    return this.http.request('/v1/contacts', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Contact — GET /v1/contacts/{id} */
  async get(id: string, params?: QuoterFieldsParams): Promise<QuoterContact> {
    return this.http.request(`/v1/contacts/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Contact — PATCH /v1/contacts/{id} */
  async update(
    id: string,
    body: QuoterContactUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterContact> {
    return this.http.request(`/v1/contacts/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }
}
