import type { CursorPaginationParams } from '../pagination.js';

/** `fields` selector accepted by Quoter fetch/create/update endpoints. */
export interface QuoterFieldsParams {
  fields?: string;
}

/** Base query params shared by the Quoter catalog listings. */
export interface QuoterCatalogListParams extends CursorPaginationParams {
  fields?: string;
  sort?: string;
  'filter[record_created_at]'?: string;
  'filter[record_updated_at]'?: string;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export interface QuoterCategory {
  id: string;
  name?: string;
  parent_category_id?: string | null;
  [key: string]: unknown;
}

export interface QuoterCategoryListParams extends QuoterCatalogListParams {
  'filter[parent_category_id]'?: string;
  'filter[name]'?: string;
}

export interface QuoterCategoryCreateRequest {
  name: string;
  parent_category?: string;
  parent_category_id?: string;
}

export interface QuoterCategoryUpdateRequest {
  name?: string;
  parent_category?: string;
  parent_category_id?: string;
}

// ---------------------------------------------------------------------------
// Item group assignments
// ---------------------------------------------------------------------------

export interface QuoterItemGroupAssignment {
  id: string;
  item_group_id?: string;
  item_id?: string;
  [key: string]: unknown;
}

export interface QuoterItemGroupAssignmentListParams extends QuoterCatalogListParams {
  'filter[item_group_id]'?: string;
  'filter[item_id]'?: string;
}

export interface QuoterItemGroupAssignmentCreateRequest {
  item_group_id: string;
  item_id: string;
}

// ---------------------------------------------------------------------------
// Item groups
// ---------------------------------------------------------------------------

export interface QuoterItemGroup {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface QuoterItemGroupListParams extends QuoterCatalogListParams {
  'filter[name]'?: string;
}

export interface QuoterItemGroupCreateRequest {
  name: string;
}

export interface QuoterItemGroupUpdateRequest {
  name?: string;
}

// ---------------------------------------------------------------------------
// Item option values
// ---------------------------------------------------------------------------

export interface QuoterItemOptionValue {
  id: string;
  name?: string;
  code?: string;
  [key: string]: unknown;
}

export interface QuoterItemOptionValueListParams extends QuoterCatalogListParams {
  'filter[code]'?: string;
  'filter[item_id]'?: string;
  'filter[item_option_id]'?: string;
  'filter[name]'?: string;
}

export interface QuoterItemOptionValueCreateRequest {
  item_option_id: string;
  name: string;
  code?: string;
  cost_decimal?: string | number;
  cost_type?: string;
  price_decimal?: string | number;
  pricing_scheme?: string;
  sort_order?: number;
}

export interface QuoterItemOptionValueUpdateRequest {
  code?: string;
  cost_decimal?: string | number;
  cost_type?: string;
  name?: string;
  price_decimal?: string | number;
  pricing_scheme?: string;
  sort_order?: number;
}

// ---------------------------------------------------------------------------
// Item options
// ---------------------------------------------------------------------------

export interface QuoterItemOption {
  id: string;
  name?: string;
  required?: boolean;
  [key: string]: unknown;
}

export interface QuoterItemOptionListParams extends QuoterCatalogListParams {
  'filter[item_id]'?: string;
  'filter[name]'?: string;
}

export interface QuoterItemOptionCreateRequest {
  item_id: string;
  name: string;
  allow_multiple_values?: boolean;
  description?: string;
  extended_description?: string;
  required?: boolean;
  sort_order?: number;
}

export interface QuoterItemOptionUpdateRequest {
  allow_multiple_values?: boolean;
  description?: string;
  extended_description?: string;
  name?: string;
  required?: boolean;
  sort_order?: number;
}

// ---------------------------------------------------------------------------
// Item tiers
// ---------------------------------------------------------------------------

export interface QuoterItemTier {
  id: string;
  lower_boundary?: number;
  [key: string]: unknown;
}

export interface QuoterItemTierListParams extends QuoterCatalogListParams {
  'filter[item_id]'?: string;
}

export interface QuoterItemTierCreateRequest {
  item_id: string;
  cost_decimal?: string | number;
  cost_type?: string;
  lower_boundary?: number;
  price_decimal?: string | number;
}

export interface QuoterItemTierUpdateRequest {
  cost_decimal?: string | number;
  cost_type?: string;
  lower_boundary?: number;
  price_decimal?: string | number;
}

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

export interface QuoterItem {
  id: string;
  name?: string;
  code?: string;
  sku?: string;
  [key: string]: unknown;
}

export interface QuoterItemListParams extends QuoterCatalogListParams {
  'filter[category_id]'?: string;
  'filter[code]'?: string;
  'filter[manufacturer_id]'?: string;
  'filter[name]'?: string;
  'filter[sku]'?: string;
  'filter[supplier_id]'?: string;
}

export interface QuoterItemCreateRequest {
  name: string;
  category_id?: string;
  allow_decimal_quantities?: boolean;
  category?: string;
  code?: string;
  cost_decimal?: string | number;
  cost_type?: string;
  description?: string;
  internal_note?: string;
  manufacturer?: string;
}

export interface QuoterItemUpdateRequest {
  allow_decimal_quantities?: boolean;
  category?: string;
  category_id?: string;
  code?: string;
  cost_decimal?: string | number;
  cost_type?: string;
  description?: string;
  internal_note?: string;
  manufacturer?: string;
  manufacturer_id?: string;
}

// ---------------------------------------------------------------------------
// Manufacturers
// ---------------------------------------------------------------------------

export interface QuoterManufacturer {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface QuoterManufacturerListParams extends QuoterCatalogListParams {
  'filter[name]'?: string;
}

export interface QuoterManufacturerCreateRequest {
  name: string;
}

export interface QuoterManufacturerUpdateRequest {
  name?: string;
}
