import type { CursorPaginationParams } from '../pagination.js';

/** A Quoter supplier. */
export interface QuoterSupplier {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface QuoterSupplierListParams extends CursorPaginationParams {
  fields?: string;
  sort?: string;
  'filter[name]'?: string;
  'filter[record_created_at]'?: string;
  'filter[record_updated_at]'?: string;
}

export interface QuoterSupplierCreateRequest {
  name: string;
}

export interface QuoterSupplierUpdateRequest {
  name?: string;
}

/** A supplier item from the pricing datafeed. */
export interface QuoterSupplierItem {
  mpn?: string;
  supplier?: string;
  price?: string | number;
  [key: string]: unknown;
}

export interface QuoterSupplierItemListParams extends CursorPaginationParams {
  'filter[mpn]'?: string;
}

/** A supplier from the pricing datafeed. */
export interface QuoterDatafeedSupplier {
  id?: string;
  name?: string;
  [key: string]: unknown;
}

export interface QuoterDatafeedSupplierListParams extends CursorPaginationParams {
  sort?: string;
}
