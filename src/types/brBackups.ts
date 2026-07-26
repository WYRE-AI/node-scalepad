import type { CursorPaginationParams } from '../pagination.js';

/** Query params for listing backup health across clients. */
export interface BrHealthListParams extends CursorPaginationParams {
  /** Number of days of backup history to include. */
  history_days?: number;
  sort?: string;
  'filter[client.name]'?: string;
}

/** Query params for a single client's backup health. */
export interface BrClientHealthParams {
  /** Number of days of backup history to include. */
  history_days?: number;
}

/** Query params for listing backup devices. */
export interface BrDeviceListParams extends CursorPaginationParams {
  /** Number of days of backup history to include. */
  history_days?: number;
  sort?: string;
  'filter[device_name]'?: string;
  'filter[device_id]'?: string;
}

/** Backup health rollup for a Backup Radar client. */
export interface BrClientBackupHealth {
  client?: {
    id?: string;
    name?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** A device tracked by Backup Radar. */
export interface BrBackupDevice {
  device_id?: string;
  device_name?: string;
  status?: string;
  client?: {
    id?: string;
    name?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
