import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmGoalsResource } from '../src/resources/lmGoals.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmGoalsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmGoalsResource', () => {
  it('lists goals', async () => {
    const page = await resource.list({ 'filter[status]': 'in_progress' });
    expect(page.data).toEqual([fx.lmGoal]);
  });

  it('gets a goal', async () => {
    expect(await resource.get('goal-1')).toEqual(fx.lmGoal);
  });

  it('creates a goal', async () => {
    expect(
      await resource.create({ client_key: 'client-key-1', title: 'Improve security posture' })
    ).toEqual(fx.lmGoal);
  });

  it('updates a goal', async () => {
    expect(await resource.update('goal-1', { title: 'Harden security' })).toEqual(fx.lmGoal);
  });

  it('deletes a goal', async () => {
    await resource.delete('goal-1');
  });

  it('updates goal status', async () => {
    await resource.updateStatus('goal-1', { status: 'completed' });
  });

  it('updates goal schedule', async () => {
    await resource.updateSchedule('goal-1', { target_period: { year: 2026, quarter: 4 } });
  });

  it('creates a goal from a template', async () => {
    expect(
      await resource.createFromTemplate('goal-tpl-1', { client_key: 'client-key-1' })
    ).toEqual(fx.lmGoal);
  });

  it('lists goal meetings', async () => {
    const res = await resource.listMeetings('goal-1');
    expect(res.data).toEqual([fx.lmMeeting]);
  });

  it('attaches and detaches a meeting', async () => {
    await resource.attachMeeting('goal-1', 'meeting-1');
    await resource.detachMeeting('goal-1', 'meeting-1');
  });

  it('lists goal initiatives', async () => {
    const res = await resource.listInitiatives('goal-1');
    expect(res.data).toEqual([fx.lmInitiative]);
  });

  it('attaches and detaches an initiative', async () => {
    await resource.attachInitiative('goal-1', 'init-1');
    await resource.detachInitiative('goal-1', 'init-1');
  });

  it('lists goal action items', async () => {
    const res = await resource.listActionItems('goal-1');
    expect(res.data).toEqual([fx.lmActionItem]);
  });

  it('attaches and detaches an action item', async () => {
    await resource.attachActionItem('goal-1', 'ai-1');
    await resource.detachActionItem('goal-1', 'ai-1');
  });

  it('lists goal templates', async () => {
    const res = await resource.listTemplates({ 'filter[title]': 'Security' });
    expect(res.data).toEqual([fx.lmGoalTemplate]);
  });

  it('gets a goal template', async () => {
    expect(await resource.getTemplate('goal-tpl-1')).toEqual(fx.lmGoalTemplate);
  });

  it('creates a goal template', async () => {
    expect(await resource.createTemplate({ goal_template: { title: 'T' } })).toEqual(
      fx.lmGoalTemplate
    );
  });

  it('updates a goal template', async () => {
    expect(
      await resource.updateTemplate('goal-tpl-1', { goal_template: { title: 'T2' } })
    ).toEqual(fx.lmGoalTemplate);
  });

  it('deletes a goal template', async () => {
    await resource.deleteTemplate('goal-tpl-1');
  });

  it('throws NotFoundError when a goal does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/goals/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.get('missing')).rejects.toThrow(NotFoundError);
  });
});
