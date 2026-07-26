import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  QuoterCategory,
  QuoterCategoryCreateRequest,
  QuoterCategoryListParams,
  QuoterCategoryUpdateRequest,
  QuoterFieldsParams,
  QuoterItem,
  QuoterItemCreateRequest,
  QuoterItemGroup,
  QuoterItemGroupAssignment,
  QuoterItemGroupAssignmentCreateRequest,
  QuoterItemGroupAssignmentListParams,
  QuoterItemGroupCreateRequest,
  QuoterItemGroupListParams,
  QuoterItemGroupUpdateRequest,
  QuoterItemListParams,
  QuoterItemOption,
  QuoterItemOptionCreateRequest,
  QuoterItemOptionListParams,
  QuoterItemOptionUpdateRequest,
  QuoterItemOptionValue,
  QuoterItemOptionValueCreateRequest,
  QuoterItemOptionValueListParams,
  QuoterItemOptionValueUpdateRequest,
  QuoterItemTier,
  QuoterItemTierCreateRequest,
  QuoterItemTierListParams,
  QuoterItemTierUpdateRequest,
  QuoterItemUpdateRequest,
  QuoterManufacturer,
  QuoterManufacturerCreateRequest,
  QuoterManufacturerListParams,
  QuoterManufacturerUpdateRequest,
} from '../types/quoterCatalog.js';

/**
 * Quoter product catalog: categories, items, item groups, item options,
 * option values, tiers, and manufacturers.
 */
export class QuoterCatalogResource {
  constructor(private readonly http: HttpClient) {}

  // -------------------------------------------------------------------------
  // Categories
  // -------------------------------------------------------------------------

  /** List Categories — GET /v1/categories */
  async listCategories(
    params?: QuoterCategoryListParams
  ): Promise<CursorPaginatedResponse<QuoterCategory>> {
    return this.http.request('/v1/categories', { params: params as Record<string, unknown> });
  }

  /** Create Category — POST /v1/categories */
  async createCategory(
    body: QuoterCategoryCreateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterCategory> {
    return this.http.request('/v1/categories', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Category — GET /v1/categories/{id} */
  async getCategory(id: string, params?: QuoterFieldsParams): Promise<QuoterCategory> {
    return this.http.request(`/v1/categories/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Category — PATCH /v1/categories/{id} */
  async updateCategory(
    id: string,
    body: QuoterCategoryUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterCategory> {
    return this.http.request(`/v1/categories/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Category — DELETE /v1/categories/{id} */
  async deleteCategory(id: string): Promise<void> {
    await this.http.request<void>(`/v1/categories/${id}`, { method: 'DELETE' });
  }

  // -------------------------------------------------------------------------
  // Item group assignments
  // -------------------------------------------------------------------------

  /** List Item Group Assignments — GET /v1/item-group-item-assignments */
  async listItemGroupAssignments(
    params?: QuoterItemGroupAssignmentListParams
  ): Promise<CursorPaginatedResponse<QuoterItemGroupAssignment>> {
    return this.http.request('/v1/item-group-item-assignments', {
      params: params as Record<string, unknown>,
    });
  }

  /** Create Item Group Assignment — POST /v1/item-group-item-assignments */
  async createItemGroupAssignment(
    body: QuoterItemGroupAssignmentCreateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemGroupAssignment> {
    return this.http.request('/v1/item-group-item-assignments', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Item Group Assignment — GET /v1/item-group-item-assignments/{id} */
  async getItemGroupAssignment(
    id: string,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemGroupAssignment> {
    return this.http.request(`/v1/item-group-item-assignments/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Item Group Assignment — DELETE /v1/item-group-item-assignments/{id} */
  async deleteItemGroupAssignment(id: string): Promise<void> {
    await this.http.request<void>(`/v1/item-group-item-assignments/${id}`, {
      method: 'DELETE',
    });
  }

  // -------------------------------------------------------------------------
  // Item groups
  // -------------------------------------------------------------------------

  /** List Item Groups — GET /v1/item-groups */
  async listItemGroups(
    params?: QuoterItemGroupListParams
  ): Promise<CursorPaginatedResponse<QuoterItemGroup>> {
    return this.http.request('/v1/item-groups', { params: params as Record<string, unknown> });
  }

  /** Create Item Group — POST /v1/item-groups */
  async createItemGroup(
    body: QuoterItemGroupCreateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemGroup> {
    return this.http.request('/v1/item-groups', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Item Group — GET /v1/item-groups/{id} */
  async getItemGroup(id: string, params?: QuoterFieldsParams): Promise<QuoterItemGroup> {
    return this.http.request(`/v1/item-groups/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Item Group — PATCH /v1/item-groups/{id} */
  async updateItemGroup(
    id: string,
    body: QuoterItemGroupUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemGroup> {
    return this.http.request(`/v1/item-groups/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Item Group — DELETE /v1/item-groups/{id} */
  async deleteItemGroup(id: string): Promise<void> {
    await this.http.request<void>(`/v1/item-groups/${id}`, { method: 'DELETE' });
  }

  // -------------------------------------------------------------------------
  // Item option values
  // -------------------------------------------------------------------------

  /** List Item Option Values — GET /v1/item-option-values */
  async listItemOptionValues(
    params?: QuoterItemOptionValueListParams
  ): Promise<CursorPaginatedResponse<QuoterItemOptionValue>> {
    return this.http.request('/v1/item-option-values', {
      params: params as Record<string, unknown>,
    });
  }

  /** Create Item Option Value — POST /v1/item-option-values */
  async createItemOptionValue(
    body: QuoterItemOptionValueCreateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemOptionValue> {
    return this.http.request('/v1/item-option-values', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Item Option Value — GET /v1/item-option-values/{id} */
  async getItemOptionValue(
    id: string,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemOptionValue> {
    return this.http.request(`/v1/item-option-values/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Item Option Value — PATCH /v1/item-option-values/{id} */
  async updateItemOptionValue(
    id: string,
    body: QuoterItemOptionValueUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemOptionValue> {
    return this.http.request(`/v1/item-option-values/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Item Option Value — DELETE /v1/item-option-values/{id} */
  async deleteItemOptionValue(id: string): Promise<void> {
    await this.http.request<void>(`/v1/item-option-values/${id}`, { method: 'DELETE' });
  }

  // -------------------------------------------------------------------------
  // Item options
  // -------------------------------------------------------------------------

  /** List Item Options — GET /v1/item-options */
  async listItemOptions(
    params?: QuoterItemOptionListParams
  ): Promise<CursorPaginatedResponse<QuoterItemOption>> {
    return this.http.request('/v1/item-options', { params: params as Record<string, unknown> });
  }

  /** Create Item Option — POST /v1/item-options */
  async createItemOption(
    body: QuoterItemOptionCreateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemOption> {
    return this.http.request('/v1/item-options', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Item Option — GET /v1/item-options/{id} */
  async getItemOption(id: string, params?: QuoterFieldsParams): Promise<QuoterItemOption> {
    return this.http.request(`/v1/item-options/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Item Option — PATCH /v1/item-options/{id} */
  async updateItemOption(
    id: string,
    body: QuoterItemOptionUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemOption> {
    return this.http.request(`/v1/item-options/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Item Option — DELETE /v1/item-options/{id} */
  async deleteItemOption(id: string): Promise<void> {
    await this.http.request<void>(`/v1/item-options/${id}`, { method: 'DELETE' });
  }

  // -------------------------------------------------------------------------
  // Item tiers
  // -------------------------------------------------------------------------

  /** List Item Tiers — GET /v1/item-tiers */
  async listItemTiers(
    params?: QuoterItemTierListParams
  ): Promise<CursorPaginatedResponse<QuoterItemTier>> {
    return this.http.request('/v1/item-tiers', { params: params as Record<string, unknown> });
  }

  /** Create Item Tier — POST /v1/item-tiers */
  async createItemTier(
    body: QuoterItemTierCreateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemTier> {
    return this.http.request('/v1/item-tiers', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Item Tier — GET /v1/item-tiers/{id} */
  async getItemTier(id: string, params?: QuoterFieldsParams): Promise<QuoterItemTier> {
    return this.http.request(`/v1/item-tiers/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Item Tier — PATCH /v1/item-tiers/{id} */
  async updateItemTier(
    id: string,
    body: QuoterItemTierUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItemTier> {
    return this.http.request(`/v1/item-tiers/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Item Tier — DELETE /v1/item-tiers/{id} */
  async deleteItemTier(id: string): Promise<void> {
    await this.http.request<void>(`/v1/item-tiers/${id}`, { method: 'DELETE' });
  }

  // -------------------------------------------------------------------------
  // Items
  // -------------------------------------------------------------------------

  /** List Items — GET /v1/items */
  async listItems(params?: QuoterItemListParams): Promise<CursorPaginatedResponse<QuoterItem>> {
    return this.http.request('/v1/items', { params: params as Record<string, unknown> });
  }

  /** Create Item — POST /v1/items */
  async createItem(body: QuoterItemCreateRequest, params?: QuoterFieldsParams): Promise<QuoterItem> {
    return this.http.request('/v1/items', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Item — GET /v1/items/{id} */
  async getItem(id: string, params?: QuoterFieldsParams): Promise<QuoterItem> {
    return this.http.request(`/v1/items/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Item — PATCH /v1/items/{id} */
  async updateItem(
    id: string,
    body: QuoterItemUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterItem> {
    return this.http.request(`/v1/items/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Item — DELETE /v1/items/{id} */
  async deleteItem(id: string): Promise<void> {
    await this.http.request<void>(`/v1/items/${id}`, { method: 'DELETE' });
  }

  // -------------------------------------------------------------------------
  // Manufacturers
  // -------------------------------------------------------------------------

  /** List Manufacturers — GET /v1/manufacturers */
  async listManufacturers(
    params?: QuoterManufacturerListParams
  ): Promise<CursorPaginatedResponse<QuoterManufacturer>> {
    return this.http.request('/v1/manufacturers', {
      params: params as Record<string, unknown>,
    });
  }

  /** Create Manufacturer — POST /v1/manufacturers */
  async createManufacturer(
    body: QuoterManufacturerCreateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterManufacturer> {
    return this.http.request('/v1/manufacturers', {
      method: 'POST',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Fetch Manufacturer — GET /v1/manufacturers/{id} */
  async getManufacturer(id: string, params?: QuoterFieldsParams): Promise<QuoterManufacturer> {
    return this.http.request(`/v1/manufacturers/${id}`, {
      params: params as Record<string, unknown>,
    });
  }

  /** Update Manufacturer — PATCH /v1/manufacturers/{id} */
  async updateManufacturer(
    id: string,
    body: QuoterManufacturerUpdateRequest,
    params?: QuoterFieldsParams
  ): Promise<QuoterManufacturer> {
    return this.http.request(`/v1/manufacturers/${id}`, {
      method: 'PATCH',
      body,
      params: params as Record<string, unknown>,
    });
  }

  /** Delete Manufacturer — DELETE /v1/manufacturers/{id} */
  async deleteManufacturer(id: string): Promise<void> {
    await this.http.request<void>(`/v1/manufacturers/${id}`, { method: 'DELETE' });
  }
}
