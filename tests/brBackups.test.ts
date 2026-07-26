import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { PaymentRequiredError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import { brBackupDevice, brClientHealth } from './fixtures/backup-radar.js';

const BASE = 'https://api.scalepad.com/backup-radar/v3';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('brBackups', () => {
  it('lists backup health across clients', async () => {
    const page = await client.brBackups.listHealth({ history_days: 30 });
    expect(page.data).toEqual([brClientHealth]);
    expect(page.next_cursor).toBeNull();
  });

  it('gets backup health for a single client', async () => {
    expect(await client.brBackups.getHealth('client-1', { history_days: 7 })).toEqual(
      brClientHealth
    );
  });

  it('lists backup devices', async () => {
    const page = await client.brBackups.listDevices({ 'filter[device_name]': 'ACME-SQL01' });
    expect(page.data).toEqual([brBackupDevice]);
  });

  it('throws PaymentRequiredError without a Backup Radar subscription', async () => {
    server.use(
      http.get(`${BASE}/clients/health`, () =>
        HttpResponse.json({ code: 'PAYMENT_REQUIRED' }, { status: 402 })
      )
    );
    await expect(client.brBackups.listHealth()).rejects.toBeInstanceOf(PaymentRequiredError);
  });
});
