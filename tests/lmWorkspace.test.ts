import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmWorkspaceResource } from '../src/resources/lmWorkspace.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmWorkspaceResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmWorkspaceResource', () => {
  it('gets the user identity', async () => {
    expect(await resource.getUserIdentity()).toEqual(fx.lmUserIdentity);
  });

  it('gets ticket create fields', async () => {
    expect(await resource.getTicketCreateFields({ client_id: 'lm-client-1' })).toEqual(
      fx.lmTicketCreateFields
    );
  });

  it('gets opportunity create fields', async () => {
    expect(await resource.getOpportunityCreateFields({ client_id: 'lm-client-1' })).toEqual(
      fx.lmOpportunityCreateFields
    );
  });

  it('lists opportunities', async () => {
    const res = await resource.listOpportunities({ client_id: 'lm-client-1' });
    expect(res.data).toEqual([fx.lmOpportunity]);
  });

  it('lists notes', async () => {
    const page = await resource.listNotes({ 'filter[is_archived]': 'false' });
    expect(page.data).toEqual([fx.lmNote]);
  });

  it('gets a note', async () => {
    expect(await resource.getNote('note-1')).toEqual(fx.lmNote);
  });

  it('creates a note', async () => {
    expect(
      await resource.createNote({ client_key: 'client-key-1', title: 'Onboarding notes' })
    ).toEqual(fx.lmNote);
  });

  it('updates a note', async () => {
    expect(await resource.updateNote('note-1', { title: 'Offboarding notes' })).toEqual(fx.lmNote);
  });

  it('deletes a note', async () => {
    await resource.deleteNote('note-1');
  });

  it('updates note archive status', async () => {
    await resource.updateNoteArchiveStatus('note-1', { is_archived: true });
  });

  it('gets a user UI state', async () => {
    expect(await resource.getUserUiState('roadmap-columns')).toEqual(fx.lmUserUiState);
  });

  it('puts a user UI state', async () => {
    await resource.putUserUiState('roadmap-columns', { payload: { columns: ['name'] } });
  });

  it('lists insights', async () => {
    const res = await resource.listInsights();
    expect(res.data).toEqual([fx.lmInsight]);
  });

  it('creates an enrollment token', async () => {
    expect(
      await resource.createEnrollmentToken('lm-client-1', { description: 'Office laptops' })
    ).toEqual(fx.lmEnrollmentToken);
  });

  it('gets the SaaS utilization summary', async () => {
    expect(await resource.getSaasUtilizationSummary('lm-client-1')).toEqual(
      fx.lmSaasUtilizationSummary
    );
  });

  it('throws NotFoundError when a note does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/notes/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.getNote('missing')).rejects.toThrow(NotFoundError);
  });
});
