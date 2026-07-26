import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  quoterCategory,
  quoterItem,
  quoterItemGroup,
  quoterItemGroupAssignment,
  quoterItemOption,
  quoterItemOptionValue,
  quoterItemTier,
  quoterManufacturer,
} from './fixtures/quoter.js';

const BASE = 'https://api.scalepad.com/quoter/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('quoterCatalog', () => {
  // --- Categories ---

  it('lists categories', async () => {
    const page = await client.quoterCatalog.listCategories({ 'filter[name]': 'Networking' });
    expect(page.data).toEqual([quoterCategory]);
  });

  it('creates a category', async () => {
    expect(await client.quoterCatalog.createCategory({ name: 'Networking' })).toEqual(
      quoterCategory
    );
  });

  it('fetches a category', async () => {
    expect(await client.quoterCatalog.getCategory('category-1')).toEqual(quoterCategory);
  });

  it('updates a category', async () => {
    expect(await client.quoterCatalog.updateCategory('category-1', { name: 'Network' })).toEqual(
      quoterCategory
    );
  });

  it('deletes a category', async () => {
    await expect(client.quoterCatalog.deleteCategory('category-1')).resolves.toBeUndefined();
  });

  // --- Item group assignments ---

  it('lists item group assignments', async () => {
    const page = await client.quoterCatalog.listItemGroupAssignments({
      'filter[item_group_id]': 'group-1',
    });
    expect(page.data).toEqual([quoterItemGroupAssignment]);
  });

  it('creates an item group assignment', async () => {
    expect(
      await client.quoterCatalog.createItemGroupAssignment({
        item_group_id: 'group-1',
        item_id: 'item-1',
      })
    ).toEqual(quoterItemGroupAssignment);
  });

  it('fetches an item group assignment', async () => {
    expect(await client.quoterCatalog.getItemGroupAssignment('iga-1')).toEqual(
      quoterItemGroupAssignment
    );
  });

  it('deletes an item group assignment', async () => {
    await expect(client.quoterCatalog.deleteItemGroupAssignment('iga-1')).resolves.toBeUndefined();
  });

  // --- Item groups ---

  it('lists item groups', async () => {
    const page = await client.quoterCatalog.listItemGroups();
    expect(page.data).toEqual([quoterItemGroup]);
  });

  it('creates an item group', async () => {
    expect(await client.quoterCatalog.createItemGroup({ name: 'Security Bundle' })).toEqual(
      quoterItemGroup
    );
  });

  it('fetches an item group', async () => {
    expect(await client.quoterCatalog.getItemGroup('group-1')).toEqual(quoterItemGroup);
  });

  it('updates an item group', async () => {
    expect(await client.quoterCatalog.updateItemGroup('group-1', { name: 'Bundle' })).toEqual(
      quoterItemGroup
    );
  });

  it('deletes an item group', async () => {
    await expect(client.quoterCatalog.deleteItemGroup('group-1')).resolves.toBeUndefined();
  });

  // --- Item option values ---

  it('lists item option values', async () => {
    const page = await client.quoterCatalog.listItemOptionValues({
      'filter[item_option_id]': 'io-1',
    });
    expect(page.data).toEqual([quoterItemOptionValue]);
  });

  it('creates an item option value', async () => {
    expect(
      await client.quoterCatalog.createItemOptionValue({
        item_option_id: 'io-1',
        name: '16 GB RAM',
      })
    ).toEqual(quoterItemOptionValue);
  });

  it('fetches an item option value', async () => {
    expect(await client.quoterCatalog.getItemOptionValue('iov-1')).toEqual(quoterItemOptionValue);
  });

  it('updates an item option value', async () => {
    expect(
      await client.quoterCatalog.updateItemOptionValue('iov-1', { name: '32 GB RAM' })
    ).toEqual(quoterItemOptionValue);
  });

  it('deletes an item option value', async () => {
    await expect(client.quoterCatalog.deleteItemOptionValue('iov-1')).resolves.toBeUndefined();
  });

  // --- Item options ---

  it('lists item options', async () => {
    const page = await client.quoterCatalog.listItemOptions({ 'filter[item_id]': 'item-1' });
    expect(page.data).toEqual([quoterItemOption]);
  });

  it('creates an item option', async () => {
    expect(
      await client.quoterCatalog.createItemOption({ item_id: 'item-1', name: 'Memory' })
    ).toEqual(quoterItemOption);
  });

  it('fetches an item option', async () => {
    expect(await client.quoterCatalog.getItemOption('io-1')).toEqual(quoterItemOption);
  });

  it('updates an item option', async () => {
    expect(await client.quoterCatalog.updateItemOption('io-1', { required: false })).toEqual(
      quoterItemOption
    );
  });

  it('deletes an item option', async () => {
    await expect(client.quoterCatalog.deleteItemOption('io-1')).resolves.toBeUndefined();
  });

  // --- Item tiers ---

  it('lists item tiers', async () => {
    const page = await client.quoterCatalog.listItemTiers({ 'filter[item_id]': 'item-1' });
    expect(page.data).toEqual([quoterItemTier]);
  });

  it('creates an item tier', async () => {
    expect(
      await client.quoterCatalog.createItemTier({ item_id: 'item-1', lower_boundary: 10 })
    ).toEqual(quoterItemTier);
  });

  it('fetches an item tier', async () => {
    expect(await client.quoterCatalog.getItemTier('tier-1')).toEqual(quoterItemTier);
  });

  it('updates an item tier', async () => {
    expect(await client.quoterCatalog.updateItemTier('tier-1', { lower_boundary: 20 })).toEqual(
      quoterItemTier
    );
  });

  it('deletes an item tier', async () => {
    await expect(client.quoterCatalog.deleteItemTier('tier-1')).resolves.toBeUndefined();
  });

  // --- Items ---

  it('lists items', async () => {
    const page = await client.quoterCatalog.listItems({ 'filter[sku]': 'FW-100' });
    expect(page.data).toEqual([quoterItem]);
  });

  it('creates an item', async () => {
    expect(await client.quoterCatalog.createItem({ name: 'Firewall Appliance' })).toEqual(
      quoterItem
    );
  });

  it('fetches an item', async () => {
    expect(await client.quoterCatalog.getItem('item-1')).toEqual(quoterItem);
  });

  it('updates an item', async () => {
    expect(await client.quoterCatalog.updateItem('item-1', { code: 'FW-100' })).toEqual(
      quoterItem
    );
  });

  it('deletes an item', async () => {
    await expect(client.quoterCatalog.deleteItem('item-1')).resolves.toBeUndefined();
  });

  // --- Manufacturers ---

  it('lists manufacturers', async () => {
    const page = await client.quoterCatalog.listManufacturers({ 'filter[name]': 'Fortinet' });
    expect(page.data).toEqual([quoterManufacturer]);
  });

  it('creates a manufacturer', async () => {
    expect(await client.quoterCatalog.createManufacturer({ name: 'Fortinet' })).toEqual(
      quoterManufacturer
    );
  });

  it('fetches a manufacturer', async () => {
    expect(await client.quoterCatalog.getManufacturer('mfr-1')).toEqual(quoterManufacturer);
  });

  it('updates a manufacturer', async () => {
    expect(await client.quoterCatalog.updateManufacturer('mfr-1', { name: 'Fortinet Inc' })).toEqual(
      quoterManufacturer
    );
  });

  it('deletes a manufacturer', async () => {
    await expect(client.quoterCatalog.deleteManufacturer('mfr-1')).resolves.toBeUndefined();
  });

  it('throws NotFoundError when an item is missing', async () => {
    server.use(
      http.get(`${BASE}/items/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.quoterCatalog.getItem('missing')).rejects.toBeInstanceOf(NotFoundError);
  });
});
