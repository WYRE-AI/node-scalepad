import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmActionItemsResource } from '../src/resources/lmActionItems.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmActionItemsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmActionItemsResource', () => {
  it('lists action items', async () => {
    const page = await resource.list({ 'filter[is_completed]': 'false' });
    expect(page.data).toEqual([fx.lmActionItem]);
  });

  it('gets an action item', async () => {
    expect(await resource.get('ai-1')).toEqual(fx.lmActionItem);
  });

  it('creates an action item', async () => {
    expect(
      await resource.create({ client_key: 'client-key-1', description: 'Order replacement server' })
    ).toEqual(fx.lmActionItem);
  });

  it('updates an action item', async () => {
    expect(
      await resource.update('ai-1', { update_payload: { description: 'Order two servers' } })
    ).toEqual(fx.lmActionItem);
  });

  it('deletes an action item', async () => {
    await resource.delete('ai-1');
  });

  it('repositions an action item', async () => {
    await resource.reposition('ai-1', { before_id: 'ai-2' });
  });

  it('updates pin status', async () => {
    await resource.updatePinStatus('ai-1', { is_pinned: true });
  });

  it('updates completion status', async () => {
    await resource.updateCompletionStatus('ai-1', { is_completed: true });
  });

  it('throws NotFoundError when an action item does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/action-items/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.get('missing')).rejects.toThrow(NotFoundError);
  });
});
