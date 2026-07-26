import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type { QuoterFieldsParams } from '../types/quoterCatalog.js';
import type {
  QuoterDatafeedSupplier,
  QuoterDatafeedSupplierListParams,
  QuoterSupplier,
  QuoterSupplierCreateRequest,
  QuoterSupplierItem,
  QuoterSupplierItemListParams,
  QuoterSupplierListParams,
  QuoterSupplierUpdateRequest,
} from '../types/quoterSuppliers.js';

/** Quoter suppliers and the supplier pricing datafeeds. */
export class QuoterSuppliersResource {
  constructor(private readonly http: HttpClient) {}

  /** List Suppliers — GET /v1/suppliers */
  async list(params?: QuoterSupplierListParams): Promise<CursorPaginatedResponse<QuoterSupplier>> {
    return this.http.request('/v1/suppliers', { params: params as Record<string, unknown> });
  }

  /** Create Supplier — POST /v1/suppliers */
  async create(
    body: QuoterSupplierCreateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterSupplier> {
    return this.http.request('/v1/suppliers', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Supplier — GET /v1/suppliers/{id} */
  async get(id: string, params?: QuoterFieldsParams): Promise<QuoterSupplier> {
    return this.http.request(`/v1/suppliers/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Supplier — PATCH /v1/suppliers/{id} */
  async update(
    id: string,
    body: QuoterSupplierUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterSupplier> {
    return this.http.request(`/v1/suppliers/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Supplier — DELETE /v1/suppliers/{id} */
  async delete(id: string): Promise<void> {
    await this.http.request<void>(`/v1/suppliers/${id}`, { method: 'DELETE' });
  }

  /** List Supplier Items (pricing datafeed) — GET /v1/datafeeds/supplier-items */
  async listSupplierItems(
    params?: QuoterSupplierItemListParams
  ): Promise<CursorPaginatedResponse<QuoterSupplierItem>> {
    return this.http.request('/v1/datafeeds/supplier-items', {
      params: params as Record<string, unknown>,
    });
  }

  /** List Suppliers (pricing datafeed) — GET /v1/datafeeds/suppliers */
  async listDatafeedSuppliers(
    params?: QuoterDatafeedSupplierListParams
  ): Promise<CursorPaginatedResponse<QuoterDatafeedSupplier>> {
    return this.http.request('/v1/datafeeds/suppliers', {
      params: params as Record<string, unknown>,
    });
  }
}
