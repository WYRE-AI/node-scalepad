import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  cmDocument,
  cmEvidence,
  cmEvidenceLink,
  cmEvidenceRequest,
  cmEvidenceSummary,
  cmSignedUrl,
} from './fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('cmEvidence', () => {
  it('searches client evidences', async () => {
    const page = await client.cmEvidence.search('client-1', { fetch_items: true });
    expect(page.data).toEqual([cmEvidence]);
  });

  it('lists evidence summaries across clients', async () => {
    const page = await client.cmEvidence.listSummaries();
    expect(page.data).toEqual([cmEvidenceSummary]);
  });

  it('creates an evidence record', async () => {
    expect(
      await client.cmEvidence.create('client-1', { title: 'Quarterly access review export' })
    ).toEqual(cmEvidence);
  });

  it('gets an evidence record', async () => {
    expect(await client.cmEvidence.get('client-1', 'evidence-1')).toEqual(cmEvidence);
  });

  it('updates an evidence record', async () => {
    expect(
      await client.cmEvidence.update('client-1', 'evidence-1', { title: 'Updated title' })
    ).toEqual(cmEvidence);
  });

  it('deletes an evidence record', async () => {
    await expect(client.cmEvidence.delete('client-1', 'evidence-1')).resolves.toBeUndefined();
  });

  it('deletes an evidence refresh schedule', async () => {
    await expect(
      client.cmEvidence.deleteSchedule('client-1', 'evidence-1', { schedule_action: 'stop' })
    ).resolves.toBeUndefined();
  });

  it('maps evidence to objectives or controls', async () => {
    await expect(
      client.cmEvidence.map('client-1', 'evidence-1', { control_codes: ['C-1'] })
    ).resolves.toBeUndefined();
  });

  it('unmaps evidence from objectives or controls', async () => {
    await expect(
      client.cmEvidence.unmap('client-1', 'evidence-1', { control_codes: ['C-1'] })
    ).resolves.toBeUndefined();
  });

  it('refreshes evidence mappings', async () => {
    await expect(client.cmEvidence.refreshMappings('client-1')).resolves.toBeUndefined();
  });

  it('lists evidence requests', async () => {
    const res = await client.cmEvidence.listRequests('client-1', 'evidence-1');
    expect(res.data).toEqual([cmEvidenceRequest]);
  });

  it('creates an evidence request', async () => {
    expect(await client.cmEvidence.createRequest('client-1', 'evidence-1')).toEqual(
      cmEvidenceRequest
    );
  });

  it('updates an evidence request', async () => {
    expect(
      await client.cmEvidence.updateRequest('client-1', 'evreq-1', { status: 'complete' })
    ).toEqual(cmEvidenceRequest);
  });

  it('deletes an evidence request', async () => {
    await expect(client.cmEvidence.deleteRequest('client-1', 'evreq-1')).resolves.toBeUndefined();
  });

  it('archives an evidence request', async () => {
    await expect(client.cmEvidence.archiveRequest('client-1', 'evreq-1')).resolves.toBeUndefined();
  });

  it('creates a link on an evidence request', async () => {
    expect(
      await client.cmEvidence.createRequestLink('client-1', {
        evidence_request_id: 'evreq-1',
        hyperlink: 'https://example.com/evidence',
      })
    ).toEqual(cmEvidenceLink);
  });

  it('creates an evidence request with a signed URL', async () => {
    expect(
      await client.cmEvidence.createRequestSignedUrl('client-1', 'evidence-1', {
        file_name: 'review.pdf',
        file_size_bytes: 1024,
      })
    ).toEqual(cmSignedUrl);
  });

  it('generates signed URLs for an evidence request document', async () => {
    expect(
      await client.cmEvidence.createRequestDocumentSignedUrl('client-1', 'evreq-1', {
        file_name: 'review.pdf',
        file_size_bytes: 1024,
      })
    ).toEqual(cmSignedUrl);
  });

  it('uploads a document to an evidence record', async () => {
    expect(
      await client.cmEvidence.uploadDocument('client-1', 'evidence-1', { file: 'binary' })
    ).toEqual(cmDocument);
  });

  it('uploads a document to an evidence request', async () => {
    expect(
      await client.cmEvidence.uploadRequestDocument('client-1', 'evreq-1', { file: 'binary' })
    ).toEqual(cmDocument);
  });

  it('gets a document signed URL', async () => {
    expect(await client.cmEvidence.getDocumentSignedUrl('client-1', 'doc-1')).toEqual(cmSignedUrl);
  });

  it('deletes a document', async () => {
    await expect(client.cmEvidence.deleteDocument('client-1', 'doc-1')).resolves.toBeUndefined();
  });

  it('throws NotFoundError when an evidence record is missing', async () => {
    server.use(
      http.get(`${BASE}/clients/client-1/evidences/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.cmEvidence.get('client-1', 'missing')).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
