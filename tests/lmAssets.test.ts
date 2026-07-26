import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { ValidationError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmAssetsResource } from '../src/resources/lmAssets.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmAssetsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmAssetsResource', () => {
  it('lists warranty pricing', async () => {
    const page = await resource.listWarrantyPricing({ warranty_type: 'server' });
    expect(page.data).toEqual([fx.lmWarrantyPricing]);
  });

  it('gets hardware replacement settings', async () => {
    expect(await resource.getHardwareReplacementSettings({ client_id: 'lm-client-1' })).toEqual(
      fx.lmHardwareReplacementSettings
    );
  });

  it('gets the hardware dashboard summary', async () => {
    expect(await resource.getHardwareDashboard({ 'filter[client_id]': 'lm-client-1' })).toEqual(
      fx.lmHardwareDashboard
    );
  });

  it('gets a hardware overview', async () => {
    expect(await resource.getHardwareOverview({ hardware_key: 'hw-key-1' })).toEqual(
      fx.lmHardwareOverview
    );
  });

  it('lists hardware assets', async () => {
    const page = await resource.listHardwareAssets({ client_id: 'lm-client-1' });
    expect(page.data).toEqual([fx.lmHardwareAsset]);
  });

  it('lists hardware lifecycles', async () => {
    const page = await resource.listHardwareLifecycles({ 'filter[serial_number]': 'SN-1000' });
    expect(page.data).toEqual([fx.lmHardwareLifecycle]);
  });

  it('looks up attached initiatives', async () => {
    const res = await resource.lookupAttachedInitiatives({ hardware_key: 'hw-key-1' });
    expect(res.data).toEqual([fx.lmAttachedInitiative]);
  });

  it('looks up attached agreements', async () => {
    const res = await resource.lookupAttachedAgreements({ hardware_key: 'hw-key-1' });
    expect(res.data).toEqual([fx.lmAttachedAgreement]);
  });

  it('throws ValidationError on a bad overview request', async () => {
    server.use(
      http.post(`${BASE}/lifecycle-manager/v1/assets/hardware/overview`, () =>
        HttpResponse.json({ error: 'hardware_key is required' }, { status: 400 })
      )
    );
    await expect(resource.getHardwareOverview({ hardware_key: '' })).rejects.toThrow(
      ValidationError
    );
  });
});
