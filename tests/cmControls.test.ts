import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  cmControl,
  cmControlFamily,
  cmControlSet,
  cmControlSummary,
} from './fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('cmControls', () => {
  it('searches client controls', async () => {
    const page = await client.cmControls.search('client-1', { filter: { status: 'implemented' } });
    expect(page.data).toEqual([cmControl]);
  });

  it('creates a control', async () => {
    expect(await client.cmControls.create('client-1', { name: 'Access Reviews' })).toEqual(
      cmControl
    );
  });

  it('gets a control', async () => {
    expect(await client.cmControls.get('client-1', 'control-1')).toEqual(cmControl);
  });

  it('updates a control', async () => {
    expect(
      await client.cmControls.update('client-1', 'control-1', { status: 'implemented' })
    ).toEqual(cmControl);
  });

  it('deletes a control', async () => {
    await expect(client.cmControls.delete('client-1', 'control-1')).resolves.toBeUndefined();
  });

  it('maps a control to related items', async () => {
    await expect(
      client.cmControls.map('client-1', 'control-1', { risk_codes: ['R-1'] })
    ).resolves.toBeUndefined();
  });

  it('unmaps a control from related items', async () => {
    await expect(
      client.cmControls.unmap('client-1', 'control-1', { risk_codes: ['R-1'] })
    ).resolves.toBeUndefined();
  });

  it('lists control summaries across clients', async () => {
    const page = await client.cmControls.listSummaries();
    expect(page.data).toEqual([cmControlSummary]);
  });

  it('gets the control summary for a client', async () => {
    expect(await client.cmControls.getSummary('client-1')).toEqual(cmControlSummary);
  });

  it('lists control families', async () => {
    const page = await client.cmControls.listFamilies('client-1', { 'filter[code]': 'AC' });
    expect(page.data).toEqual([cmControlFamily]);
  });

  it('lists control sets', async () => {
    const page = await client.cmControls.listSets('client-1');
    expect(page.data).toEqual([cmControlSet]);
  });

  it('throws NotFoundError when a control is missing', async () => {
    server.use(
      http.get(`${BASE}/clients/client-1/controls/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.cmControls.get('client-1', 'missing')).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
