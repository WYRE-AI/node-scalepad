/**
 * MSW handlers for Backup Radar (default us region base URL). Literal routes
 * are registered before the parameterized /clients/:id/health route.
 */
import { http, HttpResponse } from 'msw';

import { brBackupDevice, brClientHealth } from '../fixtures/backup-radar.js';

const BASE = 'https://api.scalepad.com/backup-radar/v3';

export const backupRadarHandlers = [
  http.get(`${BASE}/clients/health`, () =>
    HttpResponse.json({ data: [brClientHealth], next_cursor: null })
  ),
  http.get(`${BASE}/clients/devices`, () =>
    HttpResponse.json({ data: [brBackupDevice], next_cursor: null })
  ),
  http.get(`${BASE}/clients/:id/health`, () => HttpResponse.json(brClientHealth)),
];
