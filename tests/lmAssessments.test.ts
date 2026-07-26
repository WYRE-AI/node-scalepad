import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { ApiKeyAuth } from '../src/auth.js';
import { NotFoundError } from '../src/errors.js';
import { HttpClient } from '../src/http.js';
import { RateLimiter } from '../src/rate-limiter.js';
import { LmAssessmentsResource } from '../src/resources/lmAssessments.js';
import * as fx from './fixtures/lifecycle-manager.js';
import { server } from './mocks/server.js';

const BASE = 'https://api.scalepad.com';

const resource = new LmAssessmentsResource(
  new HttpClient({
    baseUrl: BASE,
    auth: new ApiKeyAuth('test-key'),
    rateLimiter: new RateLimiter(1000, 1000),
  })
);

describe('LmAssessmentsResource', () => {
  it('lists assessments', async () => {
    const page = await resource.list({ 'filter[status]': 'open' });
    expect(page.data).toEqual([fx.lmAssessment]);
  });

  it('gets an assessment', async () => {
    expect(await resource.get('assess-1')).toEqual(fx.lmAssessment);
  });

  it('creates an assessment', async () => {
    expect(
      await resource.create({ client_key: 'client-key-1', title: 'Annual security assessment' })
    ).toEqual(fx.lmAssessment);
  });

  it('updates an assessment', async () => {
    expect(await resource.update('assess-1', { title: 'Security assessment 2026' })).toEqual(
      fx.lmAssessment
    );
  });

  it('deletes an assessment', async () => {
    await resource.delete('assess-1');
  });

  it('evaluates an assessment', async () => {
    await resource.evaluate('assess-1', { question_evaluations: [] });
  });

  it('updates completion status', async () => {
    await resource.updateCompletionStatus('assess-1', { is_completed: true });
  });

  it('updates the internal comment', async () => {
    await resource.updateInternalComment('assess-1', { internal_comment: 'Reviewed' });
  });

  it('updates a question public comment', async () => {
    await resource.updateQuestionPublicComment('assess-1', 'q-1', {
      comment_plain_text: 'Looks good',
    });
  });

  it('updates a question internal comment', async () => {
    await resource.updateQuestionInternalComment('assess-1', 'q-1', {
      comment_plain_text: 'Needs follow-up',
    });
  });

  it('lists assessment templates', async () => {
    const res = await resource.listTemplates();
    expect(res.data).toEqual([fx.lmAssessmentTemplate]);
  });

  it('gets an assessment template', async () => {
    expect(await resource.getTemplate('assess-tpl-1')).toEqual(fx.lmAssessmentTemplate);
  });

  it('creates an assessment template', async () => {
    expect(await resource.createTemplate({ assessment_template: { title: 'T' } })).toEqual(
      fx.lmAssessmentTemplate
    );
  });

  it('updates an assessment template', async () => {
    expect(
      await resource.updateTemplate('assess-tpl-1', { assessment_template: { title: 'T2' } })
    ).toEqual(fx.lmAssessmentTemplate);
  });

  it('deletes an assessment template', async () => {
    await resource.deleteTemplate('assess-tpl-1');
  });

  it('throws NotFoundError when an assessment does not exist', async () => {
    server.use(
      http.get(`${BASE}/lifecycle-manager/v1/assessments/:id`, () =>
        HttpResponse.json({ error: 'not found' }, { status: 404 })
      )
    );
    await expect(resource.get('missing')).rejects.toThrow(NotFoundError);
  });
});
