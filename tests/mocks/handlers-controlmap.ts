/**
 * MSW handlers for ControlMap (default us region base URL).
 *
 * Literal routes are registered before same-shape parameterized routes so
 * paths like /clients/health never match /clients/:clientId.
 */
import { http, HttpResponse } from 'msw';

import {
  cmActionItem,
  cmActionItemSummary,
  cmAssessmentQuestion,
  cmAssessmentResponse,
  cmAssessmentSummary,
  cmClientHealth,
  cmClientReport,
  cmControl,
  cmControlFamily,
  cmControlSet,
  cmControlSummary,
  cmDocument,
  cmEvidence,
  cmEvidenceLink,
  cmEvidenceRequest,
  cmEvidenceSummary,
  cmGovernance,
  cmGovernanceSummary,
  cmObjective,
  cmObjectiveSummary,
  cmPolicy,
  cmPolicySection,
  cmPolicySummary,
  cmProcedure,
  cmProcedureSummary,
  cmRisk,
  cmRiskCategory,
  cmRiskDepartment,
  cmRiskSummary,
  cmSignedUrl,
} from '../fixtures/controlmap.js';

const BASE = 'https://api.scalepad.com/controlmap/v1';

const page = <T>(items: T[]) => HttpResponse.json({ data: items, next_cursor: null });
const list = <T>(items: T[]) => HttpResponse.json({ data: items });
const noContent = () => new HttpResponse(null, { status: 204 });

export const controlmapHandlers = [
  // --- Cross-client literal routes (before any /clients/:clientId route) ---
  http.get(`${BASE}/clients/health`, () => page([cmClientHealth])),
  http.get(`${BASE}/clients/risks-summary`, () => page([cmRiskSummary])),
  http.get(`${BASE}/clients/controls-summary`, () => page([cmControlSummary])),
  http.get(`${BASE}/clients/evidences-summary`, () => page([cmEvidenceSummary])),
  http.get(`${BASE}/clients/governance-summary`, () => page([cmGovernanceSummary])),
  http.get(`${BASE}/clients/policies-summary`, () => page([cmPolicySummary])),
  http.get(`${BASE}/clients/procedures-summary`, () => page([cmProcedureSummary])),
  http.get(`${BASE}/clients/frameworks/objectives/summary`, () => page([cmObjectiveSummary])),
  http.get(`${BASE}/clients/assessments/common/summary`, () => page([cmAssessmentSummary])),
  http.get(`${BASE}/clients/action-items-summary`, () => page([cmActionItemSummary])),

  // --- cmHealth ---
  http.get(`${BASE}/clients/:clientId/health`, () => HttpResponse.json(cmClientHealth)),
  http.post(`${BASE}/clients/:clientId/reports`, () => page([cmClientReport])),
  http.get(`${BASE}/clients/:clientId/reports/:reportId/signed-url`, () =>
    HttpResponse.json(cmSignedUrl)
  ),

  // --- cmRisks (literal 'search'/'departments' before :riskId) ---
  http.post(`${BASE}/clients/:clientId/risks/search`, () => page([cmRisk])),
  http.get(`${BASE}/clients/:clientId/risks/departments`, () => list([cmRiskDepartment])),
  http.post(`${BASE}/clients/:clientId/risks`, () =>
    HttpResponse.json(cmRisk, { status: 201 })
  ),
  http.get(`${BASE}/clients/:clientId/risks/:riskId`, () => HttpResponse.json(cmRisk)),
  http.patch(`${BASE}/clients/:clientId/risks/:riskId`, () => HttpResponse.json(cmRisk)),
  http.delete(`${BASE}/clients/:clientId/risks/:riskId`, noContent),
  http.post(`${BASE}/clients/:clientId/risks/:riskId/mappings`, noContent),
  http.post(`${BASE}/clients/:clientId/risks/:riskId/mappings/bulk-delete`, noContent),
  http.get(`${BASE}/clients/:clientId/risk-categories/:riskCategoryId`, () =>
    HttpResponse.json(cmRiskCategory)
  ),

  // --- cmControls (literal 'search' before :controlId) ---
  http.post(`${BASE}/clients/:clientId/controls/search`, () => page([cmControl])),
  http.post(`${BASE}/clients/:clientId/controls`, () =>
    HttpResponse.json(cmControl, { status: 201 })
  ),
  http.get(`${BASE}/clients/:clientId/controls-summary`, () =>
    HttpResponse.json(cmControlSummary)
  ),
  http.get(`${BASE}/clients/:clientId/controls/:controlId`, () => HttpResponse.json(cmControl)),
  http.patch(`${BASE}/clients/:clientId/controls/:controlId`, () => HttpResponse.json(cmControl)),
  http.delete(`${BASE}/clients/:clientId/controls/:controlId`, noContent),
  http.post(`${BASE}/clients/:clientId/controls/:controlId/mappings`, noContent),
  http.post(`${BASE}/clients/:clientId/controls/:controlId/mappings/bulk-delete`, noContent),
  http.get(`${BASE}/clients/:clientId/control-families`, () => page([cmControlFamily])),
  http.get(`${BASE}/clients/:clientId/control-sets`, () => page([cmControlSet])),

  // --- cmEvidence (literal 'search' before :evidenceId) ---
  http.post(`${BASE}/clients/:clientId/evidences/search`, () => page([cmEvidence])),
  http.post(`${BASE}/clients/:clientId/evidences`, () =>
    HttpResponse.json(cmEvidence, { status: 201 })
  ),
  http.get(`${BASE}/clients/:clientId/evidences/:evidenceId`, () => HttpResponse.json(cmEvidence)),
  http.patch(`${BASE}/clients/:clientId/evidences/:evidenceId`, () =>
    HttpResponse.json(cmEvidence)
  ),
  http.delete(`${BASE}/clients/:clientId/evidences/:evidenceId`, noContent),
  http.delete(`${BASE}/clients/:clientId/evidences/:evidenceId/schedule`, noContent),
  http.post(`${BASE}/clients/:clientId/evidences/:evidenceId/mappings`, noContent),
  http.post(`${BASE}/clients/:clientId/evidences/:evidenceId/mappings/bulk-delete`, noContent),
  http.get(`${BASE}/clients/:clientId/evidences/:evidenceId/requests`, () =>
    list([cmEvidenceRequest])
  ),
  http.post(`${BASE}/clients/:clientId/evidences/:evidenceId/requests`, () =>
    HttpResponse.json(cmEvidenceRequest, { status: 201 })
  ),
  http.post(`${BASE}/clients/:clientId/evidences/:evidenceId/documents/signed-url`, () =>
    HttpResponse.json(cmSignedUrl)
  ),
  http.post(`${BASE}/clients/:clientId/evidences/:evidenceId/documents`, () =>
    HttpResponse.json(cmDocument, { status: 201 })
  ),
  http.post(`${BASE}/clients/:clientId/evidence-requests/links`, () =>
    HttpResponse.json(cmEvidenceLink, { status: 201 })
  ),
  http.patch(`${BASE}/clients/:clientId/evidence-requests/:evidenceRequestId`, () =>
    HttpResponse.json(cmEvidenceRequest)
  ),
  http.delete(`${BASE}/clients/:clientId/evidence-requests/:evidenceRequestId`, noContent),
  http.post(`${BASE}/clients/:clientId/evidence-requests/:evidenceRequestId/archive`, noContent),
  http.post(
    `${BASE}/clients/:clientId/evidence-requests/:evidenceRequestId/documents/signed-url`,
    () => HttpResponse.json(cmSignedUrl)
  ),
  http.post(`${BASE}/clients/:clientId/evidence-requests/:evidenceRequestId/documents`, () =>
    HttpResponse.json(cmDocument, { status: 201 })
  ),
  http.post(`${BASE}/clients/:clientId/evidence-mappings/refresh`, noContent),
  http.get(`${BASE}/clients/:clientId/documents/:documentId`, () =>
    HttpResponse.json(cmSignedUrl)
  ),
  http.delete(`${BASE}/clients/:clientId/documents/:documentId`, noContent),

  // --- cmPolicies (literal 'search' before :id) ---
  http.post(`${BASE}/clients/:clientId/policies/search`, () => page([cmPolicy])),
  http.post(`${BASE}/clients/:clientId/policies`, () =>
    HttpResponse.json(cmPolicy, { status: 201 })
  ),
  http.get(`${BASE}/clients/:clientId/policies/:policyId`, () => HttpResponse.json(cmPolicy)),
  http.patch(`${BASE}/clients/:clientId/policies/:policyId`, () => HttpResponse.json(cmPolicy)),
  http.delete(`${BASE}/clients/:clientId/policies/:policyId`, noContent),
  http.put(`${BASE}/clients/:clientId/policies/:policyId/sections`, () =>
    HttpResponse.json(cmPolicySection)
  ),
  http.delete(`${BASE}/clients/:clientId/policies/:policyId/sections/:sectionId`, noContent),
  http.post(`${BASE}/clients/:clientId/policies/:policyId/mappings`, noContent),
  http.post(`${BASE}/clients/:clientId/policies/:policyId/mappings/bulk-delete`, noContent),
  http.post(`${BASE}/clients/:clientId/procedures/search`, () => page([cmProcedure])),
  http.post(`${BASE}/clients/:clientId/procedures`, () =>
    HttpResponse.json(cmProcedure, { status: 201 })
  ),
  http.get(`${BASE}/clients/:clientId/procedures/:procedureId`, () =>
    HttpResponse.json(cmProcedure)
  ),
  http.patch(`${BASE}/clients/:clientId/procedures/:procedureId`, () =>
    HttpResponse.json(cmProcedure)
  ),
  http.delete(`${BASE}/clients/:clientId/procedures/:procedureId`, noContent),
  http.post(`${BASE}/clients/:clientId/procedures/:procedureId/mappings`, noContent),
  http.post(`${BASE}/clients/:clientId/procedures/:procedureId/mappings/bulk-delete`, noContent),
  http.post(`${BASE}/clients/:clientId/governance/search`, () => page([cmGovernance])),
  http.post(`${BASE}/clients/:clientId/governance`, () =>
    HttpResponse.json(cmGovernance, { status: 201 })
  ),
  http.get(`${BASE}/clients/:clientId/governance/:governanceId`, () =>
    HttpResponse.json(cmGovernance)
  ),
  http.patch(`${BASE}/clients/:clientId/governance/:governanceId`, () =>
    HttpResponse.json(cmGovernance)
  ),
  http.delete(`${BASE}/clients/:clientId/governance/:governanceId`, noContent),
  http.post(`${BASE}/clients/:clientId/governance/:governanceId/mappings`, noContent),
  http.post(`${BASE}/clients/:clientId/governance/:governanceId/mappings/bulk-delete`, noContent),

  // --- cmFrameworks (literal 'objectives/summary' before :frameworkId) ---
  http.get(`${BASE}/clients/:clientId/frameworks/objectives/summary`, () =>
    HttpResponse.json(cmObjectiveSummary)
  ),
  http.post(`${BASE}/clients/:clientId/frameworks/:frameworkId/objectives/search`, () =>
    page([cmObjective])
  ),
  http.get(`${BASE}/clients/:clientId/frameworks/:frameworkId/objectives/:objectiveId`, () =>
    HttpResponse.json(cmObjective)
  ),

  // --- cmAssessments ---
  http.get(`${BASE}/clients/:clientId/assessments/common/summary`, () =>
    HttpResponse.json(cmAssessmentSummary)
  ),
  http.post(`${BASE}/clients/:clientId/assessments/common/questions`, () =>
    page([cmAssessmentQuestion])
  ),
  http.get(`${BASE}/clients/:clientId/assessments/common/questions/:questionCode`, () =>
    HttpResponse.json(cmAssessmentQuestion)
  ),
  http.put(
    `${BASE}/clients/:clientId/assessments/common/questions/:questionCode/answer`,
    noContent
  ),
  http.delete(
    `${BASE}/clients/:clientId/assessments/common/questions/:questionCode/answer`,
    noContent
  ),
  http.post(
    `${BASE}/clients/:clientId/assessments/common/questions/:questionCode/mappings`,
    noContent
  ),
  http.delete(
    `${BASE}/clients/:clientId/assessments/common/questions/:questionCode/mappings`,
    noContent
  ),
  http.post(
    `${BASE}/clients/:clientId/assessments/common/questions/:questionCode/responses`,
    () => HttpResponse.json(cmAssessmentResponse, { status: 201 })
  ),
  http.patch(
    `${BASE}/clients/:clientId/assessments/common/questions/:questionCode/responses`,
    () => HttpResponse.json(cmAssessmentResponse)
  ),
  http.delete(
    `${BASE}/clients/:clientId/assessments/common/questions/:questionCode/responses/:responseId`,
    noContent
  ),

  // --- cmActionItems (literal 'search' before :actionItemId) ---
  http.post(`${BASE}/clients/:clientId/action-items/search`, () => page([cmActionItem])),
  http.post(`${BASE}/clients/:clientId/action-items`, () =>
    HttpResponse.json(cmActionItem, { status: 201 })
  ),
  http.get(`${BASE}/clients/:clientId/action-items/:actionItemId`, () =>
    HttpResponse.json(cmActionItem)
  ),
  http.patch(`${BASE}/clients/:clientId/action-items/:actionItemId`, () =>
    HttpResponse.json(cmActionItem)
  ),
  http.delete(`${BASE}/clients/:clientId/action-items/:actionItemId`, noContent),
  http.post(`${BASE}/clients/:clientId/action-items/:actionItemId/mappings`, noContent),
  http.post(
    `${BASE}/clients/:clientId/action-items/:actionItemId/mappings/bulk-delete`,
    noContent
  ),
  http.post(`${BASE}/clients/:clientId/action-items/:actionItemId/documents`, () =>
    HttpResponse.json(cmDocument, { status: 201 })
  ),
  http.post(
    `${BASE}/clients/:clientId/action-items/:actionItemId/documents/signed-url`,
    () => HttpResponse.json(cmSignedUrl)
  ),
];
