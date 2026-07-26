import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  CoreHardwareAsset,
  CoreHardwareAssetListParams,
  CoreProductCatalogListParams,
  CoreProductCatalogRecord,
  CoreSaasAsset,
  CoreSaasAssetListParams,
  CoreSaasUser,
  CoreSaasUserListParams,
} from '../types/coreAssets.js';

/**
 * Core assets surface: hardware assets, SaaS assets, SaaS users, and the
 * product catalog. Read-only.
 */
export class CoreAssetsResource {
  constructor(private readonly http: HttpClient) {}

  async listHardwareAssets(
    params?: CoreHardwareAssetListParams
  ): Promise<CursorPaginatedResponse<CoreHardwareAsset>> {
    return this.http.request('/core/v1/assets/hardware', {
      params: params as Record<string, unknown>,
    });
  }

  async getHardwareAsset(id: string): Promise<CoreHardwareAsset> {
    return this.http.request(`/core/v1/assets/hardware/${id}`);
  }

  async listSaasAssets(
    params?: CoreSaasAssetListParams
  ): Promise<CursorPaginatedResponse<CoreSaasAsset>> {
    return this.http.request('/core/v1/assets/saas', {
      params: params as Record<string, unknown>,
    });
  }

  async getSaasAsset(id: string): Promise<CoreSaasAsset> {
    return this.http.request(`/core/v1/assets/saas/${id}`);
  }

  async listSaasUsers(
    params?: CoreSaasUserListParams
  ): Promise<CursorPaginatedResponse<CoreSaasUser>> {
    return this.http.request('/core/v1/assets/saas-users', {
      params: params as Record<string, unknown>,
    });
  }

  async getSaasUser(id: string): Promise<CoreSaasUser> {
    return this.http.request(`/core/v1/assets/saas-users/${id}`);
  }

  async listProductCatalog(
    params?: CoreProductCatalogListParams
  ): Promise<CursorPaginatedResponse<CoreProductCatalogRecord>> {
    return this.http.request('/core/v1/product-catalog', {
      params: params as Record<string, unknown>,
    });
  }

  async getProductCatalogRecord(id: string): Promise<CoreProductCatalogRecord> {
    return this.http.request(`/core/v1/product-catalog/${id}`);
  }
}
