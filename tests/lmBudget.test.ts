import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmBudgetResource } from '../src/resources/lmBudget.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmBudgetResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmBudgetResource', () => {
  it('gets the budget summary', async () => {
    expect(await resource.getSummary('lm-client-1', { frequency: 'quarterly' })).toEqual(
      fx.lmBudgetSummary
    );
  });

  it('lists IT debt', async () => {
    const page = await resource.listItDebt('lm-client-1', { period_count: 4 });
    expect(page.data).toEqual([fx.lmBudgetItDebtEntry]);
  });

  it('lists budget initiatives', async () => {
    const page = await resource.listInitiatives('lm-client-1', { 'filter[status]': 'scheduled' });
    expect(page.data).toEqual([fx.lmBudgetInitiativeEntry]);
  });

  it('lists budget contracts', async () => {
    const page = await resource.listContracts('lm-client-1');
    expect(page.data).toEqual([fx.lmBudgetContractEntry]);
  });

  it('downloads the forecast PDF', async () => {
    expect(await resource.downloadForecastPdf('lm-client-1', { include_chart: true })).toBeInstanceOf(
      ArrayBuffer
    );
  });

  it('downloads the forecast detail PDF', async () => {
    expect(
      await resource.downloadForecastDetailPdf('lm-client-1', { group: 'asset_type' })
    ).toBeInstanceOf(ArrayBuffer);
  });

  it('downloads the forecast CSV', async () => {
    expect(await resource.downloadForecastCsv('lm-client-1')).toBe(fx.lmCsvBody);
  });

  it('gets budget availabilities', async () => {
    expect(await resource.getAvailabilities('lm-client-1')).toEqual(fx.lmBudgetAvailabilities);
  });

  it('throws NotFoundError when the client has no budget', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/budget/:clientId/summary`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.getSummary('missing')).rejects.toThrow(NotFoundError);
  });
});
