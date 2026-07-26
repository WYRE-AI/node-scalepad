/** Inline fixtures shared by the ControlMap MSW handlers and tests. */

export const cmClientHealth = {
  client: { id: 'client-1', tenant_id: 'tenant-1', name: 'Acme Corp' },
  compliance_score: 87,
};

export const cmClientReport = {
  id: 'report-1',
  name: 'SOC 2 Readiness',
  created_at: '2026-07-01T00:00:00Z',
};

export const cmSignedUrl = {
  url: 'https://files.controlmap.example/report-1.pdf',
  expires_at: '2026-07-27T00:00:00Z',
};

export const cmRisk = {
  id: 'risk-1',
  code: 'R-1',
  title: 'Unpatched servers',
  status: 'open',
  department: 'IT',
};

export const cmRiskSummary = { client: { id: 'client-1', name: 'Acme Corp' }, open_risks: 4 };
export const cmRiskCategory = { id: 'risk-cat-1', name: 'Operational' };
export const cmRiskDepartment = { name: 'IT' };

export const cmControl = { id: 'control-1', name: 'Access Reviews', status: 'implemented' };
export const cmControlFamily = { id: 'family-1', name: 'Access Control', code: 'AC' };
export const cmControlSet = { id: 'set-1', name: 'Default Set', code: 'DS' };
export const cmControlSummary = { client: { id: 'client-1', name: 'Acme Corp' }, implemented: 12 };

export const cmEvidence = { id: 'evidence-1', title: 'Quarterly access review export' };
export const cmEvidenceSummary = { client: { id: 'client-1', name: 'Acme Corp' }, evidences: 9 };
export const cmEvidenceRequest = { id: 'evreq-1', status: 'pending', due_date: '2026-08-01' };
export const cmEvidenceLink = {
  id: 'link-1',
  name: 'Evidence link',
  hyperlink: 'https://example.com/evidence',
};
export const cmDocument = { id: 'doc-1', file_name: 'review.pdf' };

export const cmGovernance = { id: 'gov-1', title: 'Information Security Charter', status: 'approved' };
export const cmPolicy = { id: 'policy-1', title: 'Acceptable Use Policy', status: 'approved' };
export const cmPolicySection = { id: 'section-1', title: 'Scope' };
export const cmProcedure = { id: 'procedure-1', title: 'Employee Offboarding' };
export const cmGovernanceSummary = { client: { id: 'client-1', name: 'Acme Corp' }, governance_items: 3 };
export const cmPolicySummary = { client: { id: 'client-1', name: 'Acme Corp' }, policies: 11 };
export const cmProcedureSummary = { client: { id: 'client-1', name: 'Acme Corp' }, procedures: 6 };

export const cmObjective = { id: 'objective-1', code: 'CC1.1', name: 'Control environment' };
export const cmObjectiveSummary = { client: { id: 'client-1', name: 'Acme Corp' }, objectives_met: 42 };

export const cmAssessmentSummary = {
  client: { id: 'client-1', name: 'Acme Corp' },
  answered: 120,
  total: 150,
};
export const cmAssessmentQuestion = {
  code: 'Q-1',
  question: 'Is MFA enforced for all users?',
  answer: 'yes',
};
export const cmAssessmentResponse = {
  id: 'response-1',
  response: 'MFA enforced via Entra ID',
  provided_by: 'admin@acme.example',
};

export const cmActionItem = {
  id: 'ai-1',
  weakness_name: 'No DR runbook',
  status: 'open',
  priority: 'high',
};
export const cmActionItemSummary = { client: { id: 'client-1', name: 'Acme Corp' }, open_items: 5 };
