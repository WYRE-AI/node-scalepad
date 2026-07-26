import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { CoreClientsResource } from '../src/resources/coreClients.js';
import * as fx from './fixtures/core.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new CoreClientsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('CoreClientsResource', () => {
  it('lists clients', async () => {
    const page = await resource.listClients({ 'filter[name]': 'Acme', page_size: 10 });
    expect(page.data).toEqual([fx.coreClient]);
    expect(page.next_cursor).toBeNull();
  });

  it('gets a client', async () => {
    expect(await resource.getClient('client-1')).toEqual(fx.coreClient);
  });

  it('lists contacts (POST search)', async () => {
    const page = await resource.listContacts({ 'filter[client.id]': 'client-1' }, { filter: {} });
    expect(page.data).toEqual([fx.coreContact]);
  });

  it('gets a contact', async () => {
    expect(await resource.getContact('contact-1')).toEqual(fx.coreContact);
  });

  it('lists members (POST search)', async () => {
    const page = await resource.listMembers();
    expect(page.data).toEqual([fx.coreMember]);
  });

  it('gets a member', async () => {
    expect(await resource.getMember('member-1')).toEqual(fx.coreMember);
  });

  it('lists opportunities', async () => {
    const page = await resource.listOpportunities({ 'filter[is_active]': 'true' });
    expect(page.data).toEqual([fx.coreOpportunity]);
  });

  it('gets an opportunity', async () => {
    expect(await resource.getOpportunity('opp-1')).toEqual(fx.coreOpportunity);
  });

  it('lists sites', async () => {
    const page = await resource.listSites();
    expect(page.data).toEqual([fx.coreSite]);
  });

  it('gets a site', async () => {
    expect(await resource.getSite('site-1')).toEqual(fx.coreSite);
  });

  it('throws NotFoundError when a client does not exist', async () => {
    server.use(
      http.get(`${BASE}/core/v1/clients/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.getClient('missing')).rejects.toThrow(NotFoundError);
  });
});
