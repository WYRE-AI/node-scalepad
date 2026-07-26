import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { NotFoundError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import {
  cmGovernance,
  cmGovernanceSummary,
  cmPolicy,
  cmPolicySection,
  cmPolicySummary,
  cmProcedure,
  cmProcedureSummary,
} from './fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('cmPolicies', () => {
  // --- Policies ---

  it('searches client policies', async () => {
    const page = await client.cmPolicies.searchPolicies('client-1', {
      filter: { status: 'approved' },
    });
    expect(page.data).toEqual([cmPolicy]);
  });

  it('creates a policy', async () => {
    expect(
      await client.cmPolicies.createPolicy('client-1', { title: 'Acceptable Use Policy' })
    ).toEqual(cmPolicy);
  });

  it('gets a policy', async () => {
    expect(await client.cmPolicies.getPolicy('client-1', 'policy-1')).toEqual(cmPolicy);
  });

  it('updates a policy', async () => {
    expect(
      await client.cmPolicies.updatePolicy('client-1', 'policy-1', { status: 'approved' })
    ).toEqual(cmPolicy);
  });

  it('deletes a policy', async () => {
    await expect(client.cmPolicies.deletePolicy('client-1', 'policy-1')).resolves.toBeUndefined();
  });

  it('upserts a policy section', async () => {
    expect(
      await client.cmPolicies.upsertPolicySection('client-1', 'policy-1', { title: 'Scope' })
    ).toEqual(cmPolicySection);
  });

  it('deletes a policy section', async () => {
    await expect(
      client.cmPolicies.deletePolicySection('client-1', 'policy-1', 'section-1')
    ).resolves.toBeUndefined();
  });

  it('maps a policy to objectives and controls', async () => {
    await expect(
      client.cmPolicies.mapPolicy('client-1', 'policy-1', { control_codes: ['C-1'] })
    ).resolves.toBeUndefined();
  });

  it('unmaps a policy from objectives and controls', async () => {
    await expect(
      client.cmPolicies.unmapPolicy('client-1', 'policy-1', { control_codes: ['C-1'] })
    ).resolves.toBeUndefined();
  });

  it('lists policy summaries across clients', async () => {
    const page = await client.cmPolicies.listPolicySummaries();
    expect(page.data).toEqual([cmPolicySummary]);
  });

  // --- Procedures ---

  it('searches client procedures', async () => {
    const page = await client.cmPolicies.searchProcedures('client-1');
    expect(page.data).toEqual([cmProcedure]);
  });

  it('creates a procedure', async () => {
    expect(
      await client.cmPolicies.createProcedure('client-1', { title: 'Employee Offboarding' })
    ).toEqual(cmProcedure);
  });

  it('gets a procedure', async () => {
    expect(await client.cmPolicies.getProcedure('client-1', 'procedure-1')).toEqual(cmProcedure);
  });

  it('updates a procedure', async () => {
    expect(
      await client.cmPolicies.updateProcedure('client-1', 'procedure-1', { status: 'approved' })
    ).toEqual(cmProcedure);
  });

  it('deletes a procedure', async () => {
    await expect(
      client.cmPolicies.deleteProcedure('client-1', 'procedure-1')
    ).resolves.toBeUndefined();
  });

  it('maps a procedure to related items', async () => {
    await expect(
      client.cmPolicies.mapProcedure('client-1', 'procedure-1', { policy_codes: ['P-1'] })
    ).resolves.toBeUndefined();
  });

  it('unmaps a procedure from related items', async () => {
    await expect(
      client.cmPolicies.unmapProcedure('client-1', 'procedure-1', { policy_codes: ['P-1'] })
    ).resolves.toBeUndefined();
  });

  it('lists procedure summaries across clients', async () => {
    const page = await client.cmPolicies.listProcedureSummaries();
    expect(page.data).toEqual([cmProcedureSummary]);
  });

  // --- Governance ---

  it('searches client governance', async () => {
    const page = await client.cmPolicies.searchGovernance('client-1');
    expect(page.data).toEqual([cmGovernance]);
  });

  it('creates a governance document', async () => {
    expect(
      await client.cmPolicies.createGovernance('client-1', {
        title: 'Information Security Charter',
      })
    ).toEqual(cmGovernance);
  });

  it('gets a governance document', async () => {
    expect(await client.cmPolicies.getGovernance('client-1', 'gov-1')).toEqual(cmGovernance);
  });

  it('updates a governance document', async () => {
    expect(
      await client.cmPolicies.updateGovernance('client-1', 'gov-1', { status: 'approved' })
    ).toEqual(cmGovernance);
  });

  it('deletes a governance document', async () => {
    await expect(client.cmPolicies.deleteGovernance('client-1', 'gov-1')).resolves.toBeUndefined();
  });

  it('maps governance to related items', async () => {
    await expect(
      client.cmPolicies.mapGovernance('client-1', 'gov-1', { policy_codes: ['P-1'] })
    ).resolves.toBeUndefined();
  });

  it('unmaps governance from related items', async () => {
    await expect(
      client.cmPolicies.unmapGovernance('client-1', 'gov-1', { policy_codes: ['P-1'] })
    ).resolves.toBeUndefined();
  });

  it('lists governance summaries across clients', async () => {
    const page = await client.cmPolicies.listGovernanceSummaries();
    expect(page.data).toEqual([cmGovernanceSummary]);
  });

  it('throws NotFoundError when a policy is missing', async () => {
    server.use(
      http.get(`${BASE}/clients/client-1/policies/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 })
      )
    );
    await expect(client.cmPolicies.getPolicy('client-1', 'missing')).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
