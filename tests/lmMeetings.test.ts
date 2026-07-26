import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmMeetingsResource } from '../src/resources/lmMeetings.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmMeetingsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmMeetingsResource', () => {
  it('lists meetings', async () => {
    const page = await resource.list({ 'filter[client.id]': 'lm-client-1' });
    expect(page.data).toEqual([fx.lmMeeting]);
  });

  it('gets a meeting', async () => {
    expect(await resource.get('meeting-1')).toEqual(fx.lmMeeting);
  });

  it('creates a meeting (v1)', async () => {
    expect(await resource.create({ client_key: 'client-key-1', title: 'QBR Q3' })).toEqual(
      fx.lmMeeting
    );
  });

  it('creates a meeting (v2)', async () => {
    expect(await resource.createV2({ client_key: 'client-key-1', title: 'QBR Q3' })).toEqual(
      fx.lmMeeting
    );
  });

  it('updates a meeting (v1)', async () => {
    expect(await resource.update('meeting-1', { title: 'QBR Q3 (rescheduled)' })).toEqual(
      fx.lmMeeting
    );
  });

  it('updates a meeting (v2)', async () => {
    expect(await resource.updateV2('meeting-1', { title: 'QBR Q3 (rescheduled)' })).toEqual(
      fx.lmMeeting
    );
  });

  it('deletes a meeting', async () => {
    await resource.delete('meeting-1');
  });

  it('updates completion status', async () => {
    await resource.updateCompletionStatus('meeting-1', { is_completed: true });
  });

  it('adds and removes user attendees', async () => {
    await resource.addUserAttendees('meeting-1', { user_keys: ['user-key-1'] });
    await resource.removeUserAttendees('meeting-1', { user_keys: ['user-key-1'] });
  });

  it('adds and removes contact attendees', async () => {
    await resource.addContactAttendees('meeting-1', { contact_keys: ['contact-key-1'] });
    await resource.removeContactAttendees('meeting-1', { contact_keys: ['contact-key-1'] });
  });

  it('lists meeting initiatives', async () => {
    const res = await resource.listInitiatives('meeting-1');
    expect(res.data).toEqual([fx.lmInitiative]);
  });

  it('attaches and detaches an initiative', async () => {
    await resource.attachInitiative('meeting-1', 'init-1');
    await resource.detachInitiative('meeting-1', 'init-1');
  });

  it('lists meeting goals', async () => {
    const res = await resource.listGoals('meeting-1');
    expect(res.data).toEqual([fx.lmGoal]);
  });

  it('attaches and detaches a goal', async () => {
    await resource.attachGoal('meeting-1', 'goal-1');
    await resource.detachGoal('meeting-1', 'goal-1');
  });

  it('lists meeting action items', async () => {
    const res = await resource.listActionItems('meeting-1');
    expect(res.data).toEqual([fx.lmActionItem]);
  });

  it('attaches and detaches an action item', async () => {
    await resource.attachActionItem('meeting-1', 'ai-1');
    await resource.detachActionItem('meeting-1', 'ai-1');
  });

  it('lists meeting types', async () => {
    const res = await resource.listMeetingTypes();
    expect(res.data).toEqual([fx.lmMeetingType]);
  });

  it('creates a meeting type', async () => {
    expect(await resource.createMeetingType({ label: 'QBR' })).toEqual(fx.lmMeetingType);
  });

  it('updates a meeting type', async () => {
    expect(await resource.updateMeetingType('mt-1', { label: 'Annual review' })).toEqual(
      fx.lmMeetingType
    );
  });

  it('deletes a meeting type', async () => {
    await resource.deleteMeetingType('mt-1');
  });

  it('throws NotFoundError when a meeting does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/meetings/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.get('missing')).rejects.toThrow(NotFoundError);
  });
});
