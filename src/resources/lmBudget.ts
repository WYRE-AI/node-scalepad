import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  LmBudgetAvailabilities,
  LmBudgetContractEntry,
  LmBudgetContractsListParams,
  LmBudgetForecastCsvParams,
  LmBudgetForecastDetailPdfParams,
  LmBudgetForecastPdfParams,
  LmBudgetInitiativeEntry,
  LmBudgetInitiativesListParams,
  LmBudgetItDebtEntry,
  LmBudgetItDebtListParams,
  LmBudgetSummary,
  LmBudgetSummaryParams,
} from '../types/lmBudget.js';

/**
 * Lifecycle Manager budget surface: per-client budget summaries, IT debt,
 * initiatives, contracts, forecast exports, and availabilities.
 */
export class LmBudgetResource {
  constructor(private readonly http: HttpClient) {}

  async getSummary(clientId: string, params?: LmBudgetSummaryParams): Promise<LmBudgetSummary> {
    return this.http.request(`/lifecycle-manager/v1/budget/${clientId}/summary`, {
      params: params as Record<string, unknown>,
    });
  }

  async listItDebt(
    clientId: string,
    params?: LmBudgetItDebtListParams
  ): Promise<CursorPaginatedResponse<LmBudgetItDebtEntry>> {
    return this.http.request(`/lifecycle-manager/v1/budget/${clientId}/it-debt`, {
      params: params as Record<string, unknown>,
    });
  }

  async listInitiatives(
    clientId: string,
    params?: LmBudgetInitiativesListParams
  ): Promise<CursorPaginatedResponse<LmBudgetInitiativeEntry>> {
    return this.http.request(`/lifecycle-manager/v1/budget/${clientId}/initiatives`, {
      params: params as Record<string, unknown>,
    });
  }

  async listContracts(
    clientId: string,
    params?: LmBudgetContractsListParams
  ): Promise<CursorPaginatedResponse<LmBudgetContractEntry>> {
    return this.http.request(`/lifecycle-manager/v1/budget/${clientId}/contracts`, {
      params: params as Record<string, unknown>,
    });
  }

  async downloadForecastPdf(
    clientId: string,
    params?: LmBudgetForecastPdfParams
  ): Promise<ArrayBuffer> {
    return this.http.request(`/lifecycle-manager/v1/budget/${clientId}/forecast/pdf`, {
      params: params as Record<string, unknown>,
    });
  }

  async downloadForecastDetailPdf(
    clientId: string,
    params?: LmBudgetForecastDetailPdfParams
  ): Promise<ArrayBuffer> {
    return this.http.request(`/lifecycle-manager/v1/budget/${clientId}/forecast/detail/pdf`, {
      params: params as Record<string, unknown>,
    });
  }

  async downloadForecastCsv(
    clientId: string,
    params?: LmBudgetForecastCsvParams
  ): Promise<string> {
    return this.http.request(`/lifecycle-manager/v1/budget/${clientId}/forecast/csv`, {
      params: params as Record<string, unknown>,
    });
  }

  async getAvailabilities(clientId: string): Promise<LmBudgetAvailabilities> {
    return this.http.request(`/lifecycle-manager/v1/budget/${clientId}/availabilities`);
  }
}
