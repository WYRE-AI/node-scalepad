import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  cmAssessmentQuestion,
  cmAssessmentResponse,
  cmAssessmentSummary,
} from './fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('cmAssessments', () => {
  it('lists assessment summaries across clients', async () => {
    const page = await client.cmAssessments.listSummaries();
    expect(page.data).toEqual([cmAssessmentSummary]);
  });

  it('gets the assessment summary for a client', async () => {
    expect(
      await client.cmAssessments.getSummary('client-1', {
        include_framework_assessment_stats: true,
      })
    ).toEqual(cmAssessmentSummary);
  });

  it('searches assessment questions', async () => {
    const page = await client.cmAssessments.searchQuestions('client-1', {
      filter: { answered: false },
    });
    expect(page.data).toEqual([cmAssessmentQuestion]);
  });

  it('gets an assessment question', async () => {
    expect(await client.cmAssessments.getQuestion('client-1', 'Q-1')).toEqual(
      cmAssessmentQuestion
    );
  });

  it('saves an assessment question answer', async () => {
    await expect(
      client.cmAssessments.saveAnswer('client-1', 'Q-1', { answer: 'yes' })
    ).resolves.toBeUndefined();
  });

  it('clears an assessment question answer', async () => {
    await expect(client.cmAssessments.clearAnswer('client-1', 'Q-1')).resolves.toBeUndefined();
  });

  it('maps an assessment question to items', async () => {
    await expect(
      client.cmAssessments.mapQuestion('client-1', 'Q-1', { evidence_codes: ['E-1'] })
    ).resolves.toBeUndefined();
  });

  it('unmaps an assessment question from items', async () => {
    await expect(
      client.cmAssessments.unmapQuestion('client-1', 'Q-1', { evidence_codes: ['E-1'] })
    ).resolves.toBeUndefined();
  });

  it('creates an assessment question response', async () => {
    expect(
      await client.cmAssessments.createResponse('client-1', 'Q-1', {
        response: 'MFA enforced via Entra ID',
      })
    ).toEqual(cmAssessmentResponse);
  });

  it('updates an assessment question response', async () => {
    expect(
      await client.cmAssessments.updateResponse('client-1', 'Q-1', {
        id: 'response-1',
        response: 'Updated response',
      })
    ).toEqual(cmAssessmentResponse);
  });

  it('deletes an assessment question response', async () => {
    await expect(
      client.cmAssessments.deleteResponse('client-1', 'Q-1', 'response-1')
    ).resolves.toBeUndefined();
  });

  it('throws NotFoundError when a question is missing', async () => {
    server.use(
      http.get(`${BASE}/clients/client-1/assessments/common/questions/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.cmAssessments.getQuestion('client-1', 'missing')).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
