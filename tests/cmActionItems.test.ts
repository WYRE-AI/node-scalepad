import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  cmActionItem,
  cmActionItemSummary,
  cmDocument,
  cmSignedUrl,
} from './fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('cmActionItems', () => {
  it('searches client action items', async () => {
    const page = await client.cmActionItems.search('client-1', { filter: { status: 'open' } });
    expect(page.data).toEqual([cmActionItem]);
  });

  it('creates an action item', async () => {
    expect(
      await client.cmActionItems.create('client-1', { weakness_name: 'No DR runbook' })
    ).toEqual(cmActionItem);
  });

  it('gets an action item', async () => {
    expect(await client.cmActionItems.get('client-1', 'ai-1')).toEqual(cmActionItem);
  });

  it('updates an action item', async () => {
    expect(await client.cmActionItems.update('client-1', 'ai-1', { status: 'closed' })).toEqual(
      cmActionItem
    );
  });

  it('deletes an action item', async () => {
    await expect(client.cmActionItems.delete('client-1', 'ai-1')).resolves.toBeUndefined();
  });

  it('maps an action item to related items', async () => {
    await expect(
      client.cmActionItems.map('client-1', 'ai-1', { risk_codes: ['R-1'] })
    ).resolves.toBeUndefined();
  });

  it('unmaps an action item from related items', async () => {
    await expect(
      client.cmActionItems.unmap('client-1', 'ai-1', { risk_codes: ['R-1'] })
    ).resolves.toBeUndefined();
  });

  it('lists action item summaries across clients', async () => {
    const page = await client.cmActionItems.listSummaries();
    expect(page.data).toEqual([cmActionItemSummary]);
  });

  it('uploads a document to an action item', async () => {
    expect(
      await client.cmActionItems.uploadDocument('client-1', 'ai-1', { file: 'binary' })
    ).toEqual(cmDocument);
  });

  it('generates a signed URL for an action item document', async () => {
    expect(
      await client.cmActionItems.createDocumentSignedUrl('client-1', 'ai-1', {
        file_name: 'runbook.pdf',
        file_size_bytes: 2048,
      })
    ).toEqual(cmSignedUrl);
  });

  it('throws NotFoundError when an action item is missing', async () => {
    server.use(
      http.get(`${BASE}/clients/client-1/action-items/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.cmActionItems.get('client-1', 'missing')).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
