import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmDeliverablesResource } from '../src/resources/lmDeliverables.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmDeliverablesResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmDeliverablesResource', () => {
  it('lists deliverables across the account', async () => {
    const page = await resource.list({ 'filter[status]': 'draft' });
    expect(page.data).toEqual([fx.lmDeliverable]);
  });

  it('gets a deliverable', async () => {
    expect(await resource.get('deliv-1')).toEqual(fx.lmDeliverable);
  });

  it('updates a deliverable', async () => {
    expect(await resource.update('deliv-1', { name: 'Q4 Technology Report' })).toEqual(
      fx.lmDeliverable
    );
  });

  it('deletes a deliverable', async () => {
    await resource.delete('deliv-1');
  });

  it('downloads a deliverable PDF', async () => {
    expect(await resource.downloadPdf('deliv-1')).toBeInstanceOf(ArrayBuffer);
  });

  it('gets a deliverable presentation', async () => {
    expect(await resource.getPresentation('deliv-1')).toEqual(fx.lmDeliverablePresentation);
  });

  it('lists deliverables for a client', async () => {
    const res = await resource.listForClient('lm-client-1');
    expect(res.data).toEqual([fx.lmDeliverable]);
  });

  it('creates a deliverable for a client', async () => {
    expect(
      await resource.createForClient('lm-client-1', { name: 'Q3 Technology Report' })
    ).toEqual(fx.lmDeliverable);
  });

  it('creates a deliverable from a template', async () => {
    expect(
      await resource.createFromTemplate('lm-client-1', 'deliv-tpl-1', { name: 'From template' })
    ).toEqual(fx.lmDeliverable);
  });

  it('lists client catalog components', async () => {
    const res = await resource.listClientCatalogComponents('lm-client-1');
    expect(res.data).toEqual([fx.lmDeliverableCatalogComponent]);
  });

  it('lists catalog integrations', async () => {
    const res = await resource.listCatalogIntegrations();
    expect(res.data).toEqual([fx.lmDeliverableIntegration]);
  });

  it('lists integrated integrations for a client', async () => {
    const res = await resource.listIntegratedIntegrations('lm-client-1');
    expect(res.data).toEqual([fx.lmDeliverableIntegration]);
  });

  it('refreshes and deletes a section', async () => {
    await resource.refreshSection('deliv-1', 'sec-1');
    await resource.deleteSection('deliv-1', 'sec-1');
  });

  it('refreshes and deletes a section component', async () => {
    await resource.refreshSectionComponent('deliv-1', 'sec-1', 'comp-1');
    await resource.deleteSectionComponent('deliv-1', 'sec-1', 'comp-1');
  });

  it('lists deliverable templates', async () => {
    const res = await resource.listTemplates();
    expect(res.data).toEqual([fx.lmDeliverableTemplate]);
  });

  it('gets a deliverable template', async () => {
    expect(await resource.getTemplate('deliv-tpl-1')).toEqual(fx.lmDeliverableTemplate);
  });

  it('creates a deliverable template', async () => {
    expect(await resource.createTemplate({ name: 'QBR deck template' })).toEqual(
      fx.lmDeliverableTemplate
    );
  });

  it('updates a deliverable template', async () => {
    expect(await resource.updateTemplate('deliv-tpl-1', { name: 'QBR deck v2' })).toEqual(
      fx.lmDeliverableTemplate
    );
  });

  it('deletes a deliverable template', async () => {
    await resource.deleteTemplate('deliv-tpl-1');
  });

  it('creates a template from a template', async () => {
    expect(await resource.createTemplateFromTemplate('deliv-tpl-1')).toEqual(
      fx.lmDeliverableTemplate
    );
  });

  it('creates a template from a deliverable', async () => {
    expect(await resource.createTemplateFromDeliverable('deliv-1')).toEqual(
      fx.lmDeliverableTemplate
    );
  });

  it('lists template catalog components', async () => {
    const res = await resource.listTemplateCatalogComponents();
    expect(res.data).toEqual([fx.lmDeliverableCatalogComponent]);
  });

  it('deletes a template section', async () => {
    await resource.deleteTemplateSection('deliv-tpl-1', 'sec-1');
  });

  it('deletes a template section component', async () => {
    await resource.deleteTemplateSectionComponent('deliv-tpl-1', 'sec-1', 'comp-1');
  });

  it('gets, creates, regenerates, and revokes the general share link', async () => {
    expect(await resource.getGeneralShareLink('deliv-1')).toEqual(fx.lmDeliverableShareLink);
    expect(await resource.createGeneralShareLink('deliv-1')).toEqual(fx.lmDeliverableShareLink);
    expect(await resource.regenerateGeneralShareLink('deliv-1')).toEqual(
      fx.lmDeliverableShareLink
    );
    await resource.revokeGeneralShareLink('deliv-1');
  });

  it('throws NotFoundError when a deliverable does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/deliverables/:deliverableId`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.get('missing')).rejects.toThrow(NotFoundError);
  });
});
