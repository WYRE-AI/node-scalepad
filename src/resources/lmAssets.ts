import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  LmAttachedAgreement,
  LmAttachedInitiative,
  LmHardwareAsset,
  LmHardwareAssetListParams,
  LmHardwareDashboard,
  LmHardwareDashboardParams,
  LmHardwareKeyPayload,
  LmHardwareLifecycle,
  LmHardwareLifecycleListParams,
  LmHardwareOverview,
  LmHardwareOverviewPayload,
  LmHardwareReplacementSettings,
  LmHardwareReplacementSettingsParams,
  LmWarrantyPricing,
  LmWarrantyPricingListParams,
} from '../types/lmAssets.js';

/**
 * Lifecycle Manager assets surface: hardware assets, lifecycles, warranty
 * pricing, and attached initiative/agreement lookups.
 */
export class LmAssetsResource {
  constructor(private readonly http: HttpClient) {}

  async listWarrantyPricing(
    params?: LmWarrantyPricingListParams
  ): Promise<CursorPaginatedResponse<LmWarrantyPricing>> {
    return this.http.request('/lifecycle-manager/v1/warranty/pricing', {
      params: params as Record<string, unknown>,
    });
  }

  async getHardwareReplacementSettings(
    params?: LmHardwareReplacementSettingsParams
  ): Promise<LmHardwareReplacementSettings> {
    return this.http.request('/lifecycle-manager/v1/assets/hardware-replacement/settings', {
      params: params as Record<string, unknown>,
    });
  }

  async getHardwareDashboard(params?: LmHardwareDashboardParams): Promise<LmHardwareDashboard> {
    return this.http.request('/lifecycle-manager/v1/assets/hardware/dashboard', {
      params: params as Record<string, unknown>,
    });
  }

  async getHardwareOverview(payload: LmHardwareOverviewPayload): Promise<LmHardwareOverview> {
    return this.http.request('/lifecycle-manager/v1/assets/hardware/overview', {
      method: 'POST',
      body: payload,
    });
  }

  async listHardwareAssets(
    params?: LmHardwareAssetListParams
  ): Promise<CursorPaginatedResponse<LmHardwareAsset>> {
    return this.http.request('/lifecycle-manager/v1/assets/hardware', {
      params: params as Record<string, unknown>,
    });
  }

  async listHardwareLifecycles(
    params?: LmHardwareLifecycleListParams
  ): Promise<CursorPaginatedResponse<LmHardwareLifecycle>> {
    return this.http.request('/lifecycle-manager/v1/assets/hardware/lifecycles', {
      params: params as Record<string, unknown>,
    });
  }

  async lookupAttachedInitiatives(
    payload: LmHardwareKeyPayload
  ): Promise<{ data: LmAttachedInitiative[] }> {
    return this.http.request('/lifecycle-manager/v1/assets/hardware/attached-initiatives/lookup', {
      method: 'POST',
      body: payload,
    });
  }

  async lookupAttachedAgreements(
    payload: LmHardwareKeyPayload
  ): Promise<{ data: LmAttachedAgreement[] }> {
    return this.http.request('/lifecycle-manager/v1/assets/hardware/attached-agreements/lookup', {
      method: 'POST',
      body: payload,
    });
  }
}
