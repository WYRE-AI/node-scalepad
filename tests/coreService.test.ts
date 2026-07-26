import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { PaymentRequiredError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { CoreServiceResource } from '../src/resources/coreService.js';
import * as fx from './fixtures/core.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new CoreServiceResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('CoreServiceResource', () => {
  it('lists integration configurations', async () => {
    const res = await resource.listIntegrationConfigurations();
    expect(res.data).toEqual([fx.coreIntegrationConfiguration]);
  });

  it('lists integration vendors', async () => {
    const page = await resource.listIntegrationVendors({ 'filter[category]': 'psa' });
    expect(page.data).toEqual([fx.coreIntegrationVendor]);
  });

  it('lists contracts', async () => {
    const page = await resource.listContracts({ 'filter[status]': 'active' });
    expect(page.data).toEqual([fx.coreContract]);
  });

  it('gets a contract', async () => {
    expect(await resource.getContract('contract-1')).toEqual(fx.coreContract);
  });

  it('lists tickets', async () => {
    const page = await resource.listTickets({ 'filter[client.id]': 'client-1' });
    expect(page.data).toEqual([fx.coreTicket]);
  });

  it('gets a ticket', async () => {
    expect(await resource.getTicket('ticket-1')).toEqual(fx.coreTicket);
  });

  it('throws PaymentRequiredError when the Core subscription is missing', async () => {
    server.use(
      http.get(`${BASE}/core/v1/service/tickets`, () =>
        HttpResponse.json({ error: 'PAYMENT_REQUIRED' }, { status: 402 })
      )
    );
    await expect(resource.listTickets()).rejects.toThrow(PaymentRequiredError);
  });
});
