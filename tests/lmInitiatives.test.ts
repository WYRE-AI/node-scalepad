import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmInitiativesResource } from '../src/resources/lmInitiatives.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmInitiativesResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmInitiativesResource', () => {
  it('lists initiatives (v1)', async () => {
    const page = await resource.list({ 'filter[status]': 'scheduled' });
    expect(page.data).toEqual([fx.lmInitiative]);
  });

  it('lists initiatives (v2)', async () => {
    const page = await resource.listV2({ 'filter[client.id]': 'lm-client-1' });
    expect(page.data).toEqual([fx.lmInitiative]);
  });

  it('gets an initiative', async () => {
    expect(await resource.get('init-1')).toEqual(fx.lmInitiative);
  });

  it('creates an initiative', async () => {
    const initiative = await resource.create({ client_key: 'client-key-1', name: 'Server refresh' });
    expect(initiative).toEqual(fx.lmInitiative);
  });

  it('updates an initiative', async () => {
    expect(await resource.update('init-1', { name: 'Server refresh 2.0' })).toEqual(
      fx.lmInitiative
    );
  });

  it('deletes an initiative', async () => {
    await resource.delete('init-1');
  });

  it('updates initiative status', async () => {
    await resource.updateStatus('init-1', { status: 'completed' });
  });

  it('schedules an initiative fiscal quarter', async () => {
    await resource.updateSchedule('init-1', { fiscal_quarter: { year: 2026, quarter: 3 } });
  });

  it('updates recurring investments', async () => {
    await resource.updateRecurringInvestments('init-1', { recurring_line_items: [] });
  });

  it('updates initiative priority', async () => {
    await resource.updatePriority('init-1', { priority: 'high' });
  });

  it('updates one-time investments', async () => {
    await resource.updateOneTimeInvestments('init-1', { budget_line_items: [] });
  });

  it('updates the assigned user', async () => {
    await resource.updateAssignedUser('init-1', { assigned_user_id: 'user-1' });
  });

  it('gets the linked PSA ticket', async () => {
    expect(await resource.getTicket('init-1')).toEqual(fx.lmInitiativeTicket);
  });

  it('creates and links a ticket', async () => {
    expect(await resource.createTicket('init-1', { field_values: {} })).toEqual(
      fx.lmInitiativeTicket
    );
  });

  it('detaches the linked ticket', async () => {
    await resource.detachTicket('init-1');
  });

  it('gets the linked opportunity', async () => {
    expect(await resource.getOpportunity('init-1')).toEqual(fx.lmInitiativeOpportunity);
  });

  it('creates a linked opportunity', async () => {
    expect(await resource.createOpportunity('init-1', { field_values: {} })).toEqual(
      fx.lmInitiativeOpportunity
    );
  });

  it('deletes the linked opportunity', async () => {
    await resource.deleteOpportunity('init-1');
  });

  it('attaches an existing opportunity', async () => {
    await resource.attachOpportunity('init-1', 'psa-opp-1');
  });

  it('lists initiative meetings', async () => {
    const res = await resource.listMeetings('init-1');
    expect(res.data).toEqual([fx.lmMeeting]);
  });

  it('attaches and detaches a meeting', async () => {
    await resource.attachMeeting('init-1', 'meeting-1');
    await resource.detachMeeting('init-1', 'meeting-1');
  });

  it('lists initiative goals', async () => {
    const res = await resource.listGoals('init-1');
    expect(res.data).toEqual([fx.lmGoal]);
  });

  it('attaches and detaches a goal', async () => {
    await resource.attachGoal('init-1', 'goal-1');
    await resource.detachGoal('init-1', 'goal-1');
  });

  it('lists initiative action items', async () => {
    const res = await resource.listActionItems('init-1');
    expect(res.data).toEqual([fx.lmActionItem]);
  });

  it('attaches and detaches an action item', async () => {
    await resource.attachActionItem('init-1', 'ai-1');
    await resource.detachActionItem('init-1', 'ai-1');
  });

  it('lists initiative quotes', async () => {
    const res = await resource.listQuotes('init-1');
    expect(res.data).toEqual([fx.lmInitiativeQuote]);
  });

  it('downloads the initiative PDF', async () => {
    const buffer = await resource.downloadPdf('init-1');
    expect(buffer).toBeInstanceOf(ArrayBuffer);
    expect(buffer.byteLength).toBe(fx.lmPdfBytes.byteLength);
  });

  it('attaches and detaches assets', async () => {
    await resource.attachAssets('init-1', { hardware_keys: ['hw-key-1'] });
    await resource.detachAssets('init-1', { hardware_keys: ['hw-key-1'] });
  });

  it('lists initiative templates', async () => {
    const page = await resource.listTemplates({ page_size: 10 });
    expect(page.data).toEqual([fx.lmInitiativeTemplate]);
  });

  it('gets an initiative template', async () => {
    expect(await resource.getTemplate('init-tpl-1')).toEqual(fx.lmInitiativeTemplate);
  });

  it('creates an initiative template', async () => {
    expect(await resource.createTemplate({ initiative_template: { name: 'T' } })).toEqual(
      fx.lmInitiativeTemplate
    );
  });

  it('updates an initiative template', async () => {
    expect(
      await resource.updateTemplate('init-tpl-1', { initiative_template: { name: 'T2' } })
    ).toEqual(fx.lmInitiativeTemplate);
  });

  it('deletes an initiative template', async () => {
    await resource.deleteTemplate('init-tpl-1');
  });

  it('duplicates an initiative template', async () => {
    expect(await resource.duplicateTemplate('init-tpl-1')).toEqual(fx.lmInitiativeTemplate);
  });

  it('applies a template to an initiative', async () => {
    await resource.applyTemplate('init-1', 'init-tpl-1');
  });

  it('generates a roadmap spreadsheet', async () => {
    expect(
      await resource.generateRoadmapSpreadsheet({ client_id: 'lm-client-1' })
    ).toBeInstanceOf(ArrayBuffer);
  });

  it('generates a roadmap PDF', async () => {
    expect(await resource.generateRoadmapPdf({ client_id: 'lm-client-1' })).toBeInstanceOf(
      ArrayBuffer
    );
  });

  it('generates a roadmap CSV', async () => {
    expect(await resource.generateRoadmapCsv({ client_id: 'lm-client-1' })).toBe(fx.lmCsvBody);
  });

  it('throws NotFoundError when an initiative does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/initiatives/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.get('missing')).rejects.toThrow(NotFoundError);
  });
});
