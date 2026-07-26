import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  quoterDatafeedSupplier,
  quoterSupplier,
  quoterSupplierItem,
} from './fixtures/quoter.js';

const BASE = 'https://api.scalepad.com/quoter/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('quoterSuppliers', () => {
  it('lists suppliers', async () => {
    const page = await client.quoterSuppliers.list({ 'filter[name]': 'Ingram Micro' });
    expect(page.data).toEqual([quoterSupplier]);
  });

  it('creates a supplier', async () => {
    expect(await client.quoterSuppliers.create({ name: 'Ingram Micro' })).toEqual(quoterSupplier);
  });

  it('fetches a supplier', async () => {
    expect(await client.quoterSuppliers.get('supplier-1')).toEqual(quoterSupplier);
  });

  it('updates a supplier', async () => {
    expect(await client.quoterSuppliers.update('supplier-1', { name: 'Ingram' })).toEqual(
      quoterSupplier
    );
  });

  it('deletes a supplier', async () => {
    await expect(client.quoterSuppliers.delete('supplier-1')).resolves.toBeUndefined();
  });

  it('lists supplier items from the datafeed', async () => {
    const page = await client.quoterSuppliers.listSupplierItems({ 'filter[mpn]': 'FW-100' });
    expect(page.data).toEqual([quoterSupplierItem]);
  });

  it('lists suppliers from the datafeed', async () => {
    const page = await client.quoterSuppliers.listDatafeedSuppliers();
    expect(page.data).toEqual([quoterDatafeedSupplier]);
  });

  it('throws NotFoundError when a supplier is missing', async () => {
    server.use(
      http.get(`${BASE}/suppliers/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.quoterSuppliers.get('missing')).rejects.toBeInstanceOf(NotFoundError);
  });
});
