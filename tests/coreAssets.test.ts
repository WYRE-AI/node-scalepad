import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { CoreAssetsResource } from '../src/resources/coreAssets.js';
import * as fx from './fixtures/core.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new CoreAssetsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('CoreAssetsResource', () => {
  it('lists hardware assets', async () => {
    const page = await resource.listHardwareAssets({ 'filter[type]': 'workstation' });
    expect(page.data).toEqual([fx.coreHardwareAsset]);
  });

  it('gets a hardware asset', async () => {
    expect(await resource.getHardwareAsset('hw-1')).toEqual(fx.coreHardwareAsset);
  });

  it('lists SaaS assets', async () => {
    const page = await resource.listSaasAssets({ 'filter[status]': 'active' });
    expect(page.data).toEqual([fx.coreSaasAsset]);
  });

  it('gets a SaaS asset', async () => {
    expect(await resource.getSaasAsset('saas-1')).toEqual(fx.coreSaasAsset);
  });

  it('lists SaaS users', async () => {
    const page = await resource.listSaasUsers();
    expect(page.data).toEqual([fx.coreSaasUser]);
  });

  it('gets a SaaS user', async () => {
    expect(await resource.getSaasUser('saas-user-1')).toEqual(fx.coreSaasUser);
  });

  it('lists product catalog records', async () => {
    const page = await resource.listProductCatalog({ 'filter[is_active]': 'true' });
    expect(page.data).toEqual([fx.coreProductCatalogRecord]);
  });

  it('gets a product catalog record', async () => {
    expect(await resource.getProductCatalogRecord('prod-1')).toEqual(fx.coreProductCatalogRecord);
  });

  it('throws NotFoundError when a hardware asset does not exist', async () => {
    server.use(
      http.get(`${BASE}/core/v1/assets/hardware/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.getHardwareAsset('missing')).rejects.toThrow(NotFoundError);
  });
});
