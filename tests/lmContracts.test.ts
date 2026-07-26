import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmContractsResource } from '../src/resources/lmContracts.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmContractsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmContractsResource', () => {
  it('lists contracts', async () => {
    const page = await resource.list({ 'filter[expiry_status]': 'active' });
    expect(page.data).toEqual([fx.lmContract]);
  });

  it('gets a contract', async () => {
    expect(await resource.get('lm-contract-1')).toEqual(fx.lmContract);
  });

  it('creates a contract', async () => {
    expect(
      await resource.create({
        client_key: 'client-key-1',
        create_payload: { name: 'Microsoft 365 agreement' },
      })
    ).toEqual(fx.lmContract);
  });

  it('updates a contract', async () => {
    expect(
      await resource.update('lm-contract-1', { update_payload: { name: 'M365 agreement' } })
    ).toEqual(fx.lmContract);
  });

  it('deletes a contract', async () => {
    await resource.delete('lm-contract-1');
  });

  it('attaches hardware assets', async () => {
    await resource.attachAssets('lm-contract-1', { hardware_keys: ['hw-key-1'] });
  });

  it('detaches hardware assets', async () => {
    await resource.detachAssets('lm-contract-1', { hardware_keys: ['hw-key-1'] });
  });

  it('throws NotFoundError when a contract does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/contracts/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.get('missing')).rejects.toThrow(NotFoundError);
  });
});
