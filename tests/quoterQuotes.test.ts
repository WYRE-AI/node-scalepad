import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  quoterLineItem,
  quoterQuote,
  quoterQuoteSection,
  quoterQuoteTemplate,
} from './fixtures/quoter.js';

const BASE = 'https://api.scalepad.com/quoter/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('quoterQuotes', () => {
  it('lists quotes', async () => {
    const page = await client.quoterQuotes.list({ 'filter[stage]': 'draft' });
    expect(page.data).toEqual([quoterQuote]);
    expect(page.next_cursor).toBeNull();
  });

  it('creates a quote', async () => {
    expect(await client.quoterQuotes.create({ template_id: 'template-1' })).toEqual(quoterQuote);
  });

  it('fetches a quote', async () => {
    expect(await client.quoterQuotes.get('quote-1')).toEqual(quoterQuote);
  });

  it('publishes a quote', async () => {
    expect(await client.quoterQuotes.publish('quote-1')).toEqual(quoterQuote);
  });

  it('creates a quote section', async () => {
    expect(await client.quoterQuotes.createSection('quote-1', { name: 'Hardware' })).toEqual(
      quoterQuoteSection
    );
  });

  it('creates a line item in a quote section', async () => {
    expect(
      await client.quoterQuotes.createSectionLineItem('quote-1', 'qsection-1', {
        name: 'Firewall Appliance',
        quantity_decimal: '1',
      })
    ).toEqual(quoterLineItem);
  });

  it('patches a line item in a quote section', async () => {
    expect(
      await client.quoterQuotes.updateSectionLineItem('quote-1', 'qsection-1', 'li-1', {
        quantity_decimal: '2',
      })
    ).toEqual(quoterLineItem);
  });

  it('creates a top-level line item', async () => {
    expect(
      await client.quoterQuotes.createLineItem({ quote_id: 'quote-1', name: 'Firewall Appliance' })
    ).toEqual(quoterLineItem);
  });

  it('lists quote templates', async () => {
    const page = await client.quoterQuotes.listTemplates();
    expect(page.data).toEqual([quoterQuoteTemplate]);
  });

  it('throws NotFoundError when a quote is missing', async () => {
    server.use(
      http.get(`${BASE}/quotes/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.quoterQuotes.get('missing')).rejects.toBeInstanceOf(NotFoundError);
  });
});
