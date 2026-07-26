/** Inline fixtures shared by the Backup Radar MSW handlers and tests. */

export const brClientHealth = {
  client: { id: 'client-1', name: 'Acme Corp' },
  success_rate: 0.98,
  failed_backups: 1,
};

export const brBackupDevice = {
  device_id: 'device-1',
  device_name: 'ACME-SQL01',
  status: 'success',
  client: { id: 'client-1', name: 'Acme Corp' },
};
