import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import { quoterContact } from './fixtures/quoter.js';

const BASE = 'https://api.scalepad.com/quoter/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('quoterContacts', () => {
  it('lists contacts', async () => {
    const page = await client.quoterContacts.list({ 'filter[organization]': 'Acme Corp' });
    expect(page.data).toEqual([quoterContact]);
  });

  it('creates a contact', async () => {
    expect(
      await client.quoterContacts.create({
        billing_first_name: 'Jane',
        billing_last_name: 'Doe',
      })
    ).toEqual(quoterContact);
  });

  it('fetches a contact', async () => {
    expect(await client.quoterContacts.get('contact-1')).toEqual(quoterContact);
  });

  it('updates a contact', async () => {
    expect(
      await client.quoterContacts.update('contact-1', { billing_email: 'jane@acme.example' })
    ).toEqual(quoterContact);
  });

  it('throws NotFoundError when a contact is missing', async () => {
    server.use(
      http.get(`${BASE}/contacts/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.quoterContacts.get('missing')).rejects.toBeInstanceOf(NotFoundError);
  });
});
