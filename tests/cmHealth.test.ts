import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import { cmClientHealth, cmClientReport, cmSignedUrl } from './fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('cmHealth', () => {
  it('lists compliance health metrics across clients', async () => {
    const page = await client.cmHealth.listHealth({ page_size: 50 });
    expect(page.data).toEqual([cmClientHealth]);
    expect(page.next_cursor).toBeNull();
  });

  it('gets compliance health for a client', async () => {
    expect(await client.cmHealth.getHealth('client-1')).toEqual(cmClientHealth);
  });

  it('lists client reports', async () => {
    const page = await client.cmHealth.listReports('client-1', { page_size: 10 });
    expect(page.data).toEqual([cmClientReport]);
  });

  it('gets a report signed URL', async () => {
    expect(await client.cmHealth.getReportSignedUrl('client-1', 'report-1')).toEqual(cmSignedUrl);
  });

  it('throws NotFoundError when a client is missing', async () => {
    server.use(
      http.get(`${BASE}/clients/missing/health`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.cmHealth.getHealth('missing')).rejects.toBeInstanceOf(NotFoundError);
  });
});
