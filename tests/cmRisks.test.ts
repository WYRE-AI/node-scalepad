import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  cmRisk,
  cmRiskCategory,
  cmRiskDepartment,
  cmRiskSummary,
} from './fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('cmRisks', () => {
  it('searches client risks', async () => {
    const page = await client.cmRisks.search('client-1', { filter: { status: 'open' } });
    expect(page.data).toEqual([cmRisk]);
  });

  it('creates a risk', async () => {
    expect(await client.cmRisks.create('client-1', { name: 'Unpatched servers' })).toEqual(cmRisk);
  });

  it('gets a risk', async () => {
    expect(await client.cmRisks.get('client-1', 'risk-1')).toEqual(cmRisk);
  });

  it('updates a risk', async () => {
    expect(await client.cmRisks.update('client-1', 'risk-1', { status: 'closed' })).toEqual(cmRisk);
  });

  it('deletes a risk', async () => {
    await expect(client.cmRisks.delete('client-1', 'risk-1')).resolves.toBeUndefined();
  });

  it('lists risk summaries across clients', async () => {
    const page = await client.cmRisks.listSummaries();
    expect(page.data).toEqual([cmRiskSummary]);
  });

  it('maps a risk to related items', async () => {
    await expect(
      client.cmRisks.map('client-1', 'risk-1', { control_codes: ['C-1'] })
    ).resolves.toBeUndefined();
  });

  it('unmaps a risk from related items', async () => {
    await expect(
      client.cmRisks.unmap('client-1', 'risk-1', { control_codes: ['C-1'] })
    ).resolves.toBeUndefined();
  });

  it('gets a risk category', async () => {
    expect(await client.cmRisks.getCategory('client-1', 'risk-cat-1')).toEqual(cmRiskCategory);
  });

  it('lists risk departments', async () => {
    const res = await client.cmRisks.listDepartments('client-1');
    expect(res.data).toEqual([cmRiskDepartment]);
  });

  it('throws NotFoundError when a risk is missing', async () => {
    server.use(
      http.get(`${BASE}/clients/client-1/risks/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.cmRisks.get('client-1', 'missing')).rejects.toBeInstanceOf(NotFoundError);
  });
});
