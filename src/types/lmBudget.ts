/**
 * Types for the Lifecycle Manager budget surface: per-client budget
 * summaries, IT debt, initiatives, contracts, forecast exports, and
 * availabilities.
 */
import type { CursorPaginationParams } from '../pagination.js';

/** Forecast window parameters shared by every budget endpoint. */
export interface LmBudgetPeriodParams {
  frequency?: string;
  period_count?: number;
  starting_date?: string;
  include_overdue?: boolean;
  include_not_scheduled?: boolean;
}

export interface LmBudgetSummary {
  client_id?: string;
  [key: string]: unknown;
}

export interface LmBudgetSummaryParams extends LmBudgetPeriodParams {
  'filter[type]'?: string;
  'filter[status]'?: string;
  'filter[asset_type.id]'?: string;
  'filter[is_third_party]'?: string;
  'filter[name]'?: string;
  it_debt_group_by_asset_type?: boolean;
}

export interface LmBudgetItDebtEntry {
  id?: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmBudgetItDebtListParams
  extends LmBudgetPeriodParams,
    CursorPaginationParams {
  'filter[asset_type.id]'?: string;
  'filter[name]'?: string;
  sort?: string;
}

export interface LmBudgetInitiativeEntry {
  id?: string;
  name?: string;
  status?: string;
  [key: string]: unknown;
}

export interface LmBudgetInitiativesListParams
  extends LmBudgetPeriodParams,
    CursorPaginationParams {
  'filter[status]'?: string;
  'filter[name]'?: string;
  sort?: string;
}

export interface LmBudgetContractEntry {
  id?: string;
  name?: string;
  [key: string]: unknown;
}

export interface LmBudgetContractsListParams
  extends LmBudgetPeriodParams,
    CursorPaginationParams {
  'filter[is_third_party]'?: string;
  'filter[name]'?: string;
  sort?: string;
}

export interface LmBudgetForecastPdfParams extends LmBudgetPeriodParams {
  include_chart?: boolean;
  'filter[type]'?: string;
  'filter[status]'?: string;
  'filter[asset_type.id]'?: string;
  'filter[is_third_party]'?: string;
  'filter[name]'?: string;
}

export interface LmBudgetForecastDetailPdfParams extends LmBudgetForecastPdfParams {
  group?: string;
}

export interface LmBudgetForecastCsvParams extends LmBudgetPeriodParams {
  'filter[type]'?: string;
  'filter[status]'?: string;
  'filter[asset_type.id]'?: string;
  'filter[is_third_party]'?: string;
  'filter[name]'?: string;
}

export interface LmBudgetAvailabilities {
  [key: string]: unknown;
}
