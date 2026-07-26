import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import { cmObjective, cmObjectiveSummary } from './fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('cmFrameworks', () => {
  it('searches client objectives', async () => {
    const page = await client.cmFrameworks.searchObjectives('client-1', 'framework-1', {
      filter: { status: 'met' },
    });
    expect(page.data).toEqual([cmObjective]);
  });

  it('gets a client objective', async () => {
    expect(
      await client.cmFrameworks.getObjective('client-1', 'framework-1', 'objective-1')
    ).toEqual(cmObjective);
  });

  it('gets the objective summary for a client', async () => {
    expect(await client.cmFrameworks.getObjectiveSummary('client-1')).toEqual(cmObjectiveSummary);
  });

  it('lists objective summaries across clients', async () => {
    const page = await client.cmFrameworks.listObjectiveSummaries();
    expect(page.data).toEqual([cmObjectiveSummary]);
  });

  it('throws NotFoundError when an objective is missing', async () => {
    server.use(
      http.get(`${BASE}/clients/client-1/frameworks/framework-1/objectives/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(
      client.cmFrameworks.getObjective('client-1', 'framework-1', 'missing')
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
