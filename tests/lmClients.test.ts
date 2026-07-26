import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmClientsResource } from '../src/resources/lmClients.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmClientsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmClientsResource', () => {
  it('lists clients', async () => {
    const page = await resource.listClients({ search: 'Acme' });
    expect(page.data).toEqual([fx.lmClient]);
  });

  it('looks up clients', async () => {
    const page = await resource.lookupClients({ search: 'Acme' });
    expect(page.data).toEqual([fx.lmClient]);
  });

  it('looks up client members', async () => {
    const res = await resource.lookupClientMembers('lm-client-1', { search: 'Sam' });
    expect(res.data).toEqual([fx.lmMember]);
  });

  it('looks up client contacts', async () => {
    const res = await resource.lookupClientContacts('lm-client-1');
    expect(res.data).toEqual([fx.lmContact]);
  });

  it('lists contacts', async () => {
    const page = await resource.listContacts({ 'filter[client_id]': 'lm-client-1' });
    expect(page.data).toEqual([fx.lmContact]);
  });

  it('gets a contact', async () => {
    expect(await resource.getContact('lm-contact-1')).toEqual(fx.lmContact);
  });

  it('updates contact hidden status', async () => {
    await resource.updateContactHiddenStatus('lm-contact-1', { is_hidden: true });
  });

  it('lists client groups', async () => {
    const res = await resource.listClientGroups();
    expect(res.data).toEqual([fx.lmClientGroup]);
  });

  it('gets a client group', async () => {
    expect(await resource.getClientGroup('group-1')).toEqual(fx.lmClientGroup);
  });

  it('looks up client groups by client key', async () => {
    const res = await resource.lookupClientGroups({ client_key: 'client-key-1' });
    expect(res.data).toEqual([fx.lmClientGroup]);
  });

  it('assigns clients/users to a client group', async () => {
    await resource.assignClientGroup('group-1', { client_keys: ['client-key-1'] });
  });

  it('unassigns clients/users from a client group', async () => {
    await resource.unassignClientGroup('group-1', { user_keys: ['user-key-1'] });
  });

  it('lists active users', async () => {
    const res = await resource.listActiveUsers();
    expect(res.data).toEqual([fx.lmActiveUser]);
  });

  it('throws NotFoundError when a contact does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/contacts/:contactId`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.getContact('missing')).rejects.toThrow(NotFoundError);
  });
});
