import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  BrBackupDevice,
  BrClientBackupHealth,
  BrClientHealthParams,
  BrDeviceListParams,
  BrHealthListParams,
} from '../types/brBackups.js';

/** Backup Radar read-only v3 surface: backup health and device inventory. */
export class BrBackupsResource {
  constructor(private readonly http: HttpClient) {}

  /** List clients and their backup health — GET /backup-radar/v3/clients/health */
  async listHealth(
    params?: BrHealthListParams
  ): Promise<CursorPaginatedResponse<BrClientBackupHealth>> {
    return this.http.request('/backup-radar/v3/clients/health', {
      params: params as Record<string, unknown>,
    });
  }

  /** Get backup health for a single client — GET /backup-radar/v3/clients/{id}/health */
  async getHealth(id: string, params?: BrClientHealthParams): Promise<BrClientBackupHealth> {
    return this.http.request(`/backup-radar/v3/clients/${id}/health`, {
      params: params as Record<string, unknown>,
    });
  }

  /** List backup devices — GET /backup-radar/v3/clients/devices */
  async listDevices(
    params?: BrDeviceListParams
  ): Promise<CursorPaginatedResponse<BrBackupDevice>> {
    return this.http.request('/backup-radar/v3/clients/devices', {
      params: params as Record<string, unknown>,
    });
  }
}
