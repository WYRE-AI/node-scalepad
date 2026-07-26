/**
 * MSW handlers for the Lifecycle Manager product (fixtures live in
 * ../fixtures/lifecycle-manager.ts).
 *
 * Ordering note: literal routes (e.g. /deliverables/templates) are registered
 * before parameterized siblings (/deliverables/:deliverableId) so MSW never
 * captures a literal segment as a path param.
 */
import { http, HttpResponse, type RequestHandler } from 'msw';

import * as fx from '../fixtures/lifecycle-manager.js';

const BASE = 'https://api.scalepad.com';
const LM = `${BASE}/lifecycle-manager/v1`;
const LM2 = `${BASE}/lifecycle-manager/v2`;

const list = (items: unknown[]) => HttpResponse.json({ data: items, next_cursor: null });
const data = (items: unknown[]) => HttpResponse.json({ data: items });
const created = (body: Record<string, unknown>) => HttpResponse.json(body, { status: 201 });
const noContent = () => new HttpResponse(null, { status: 204 });
const pdf = () =>
  new HttpResponse(fx.lmPdfBytes, { headers: { 'Content-Type': 'application/pdf' } });
const xlsx = () =>
  new HttpResponse(fx.lmPdfBytes, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  });
const csv = () => new HttpResponse(fx.lmCsvBody, { headers: { 'Content-Type': 'text/csv' } });

export const lifecycleManagerHandlers: RequestHandler[] = [
  // --- lmClients ---
  http.get(`${LM}/contacts`, () => list([fx.lmContact])),
  http.get(`${LM}/contacts/:contactId`, () => HttpResponse.json(fx.lmContact)),
  http.put(`${LM}/contacts/:contactId/hidden-status`, () => noContent()),
  http.get(`${LM}/clients/lookup`, () => list([fx.lmClient])),
  http.post(`${LM}/clients/client-groups/lookup`, () => data([fx.lmClientGroup])),
  http.get(`${LM}/clients/:clientId/members/lookup`, () => data([fx.lmMember])),
  http.get(`${LM}/clients/:clientId/contacts/lookup`, () => data([fx.lmContact])),
  http.get(`${LM}/clients`, () => list([fx.lmClient])),
  http.get(`${LM}/client-groups`, () => data([fx.lmClientGroup])),
  http.get(`${LM}/client-groups/:clientGroupId`, () => HttpResponse.json(fx.lmClientGroup)),
  http.post(`${LM}/client-groups/:clientGroupId/assignments/unassign`, () => noContent()),
  http.post(`${LM}/client-groups/:clientGroupId/assignments`, () => noContent()),
  http.get(`${LM}/active-users`, () => data([fx.lmActiveUser])),

  // --- lmAssets ---
  http.get(`${LM}/warranty/pricing`, () => list([fx.lmWarrantyPricing])),
  http.get(`${LM}/assets/hardware-replacement/settings`, () =>
    HttpResponse.json(fx.lmHardwareReplacementSettings)
  ),
  http.get(`${LM}/assets/hardware/dashboard`, () => HttpResponse.json(fx.lmHardwareDashboard)),
  http.post(`${LM}/assets/hardware/overview`, () => HttpResponse.json(fx.lmHardwareOverview)),
  http.get(`${LM}/assets/hardware/lifecycles`, () => list([fx.lmHardwareLifecycle])),
  http.get(`${LM}/assets/hardware`, () => list([fx.lmHardwareAsset])),
  http.post(`${LM}/assets/hardware/attached-initiatives/lookup`, () =>
    data([fx.lmAttachedInitiative])
  ),
  http.post(`${LM}/assets/hardware/attached-agreements/lookup`, () =>
    data([fx.lmAttachedAgreement])
  ),

  // --- lmInitiatives ---
  http.post(`${LM}/roadmap/spreadsheet`, () => xlsx()),
  http.post(`${LM}/roadmap/pdf`, () => pdf()),
  http.post(`${LM}/roadmap/csv`, () => csv()),
  http.get(`${LM2}/initiatives`, () => list([fx.lmInitiative])),
  http.get(`${LM}/initiatives`, () => list([fx.lmInitiative])),
  http.post(`${LM}/initiatives`, () => created(fx.lmInitiative)),
  http.get(`${LM}/initiatives/:id`, () => HttpResponse.json(fx.lmInitiative)),
  http.put(`${LM}/initiatives/:id`, () => HttpResponse.json(fx.lmInitiative)),
  http.delete(`${LM}/initiatives/:id`, () => noContent()),
  http.put(`${LM}/initiatives/:id/status`, () => noContent()),
  http.put(`${LM}/initiatives/:id/schedule`, () => noContent()),
  http.put(`${LM}/initiatives/:id/recurring`, () => noContent()),
  http.put(`${LM}/initiatives/:id/priority`, () => noContent()),
  http.put(`${LM}/initiatives/:id/budget`, () => noContent()),
  http.put(`${LM}/initiatives/:initiativeId/assigned-user`, () => noContent()),
  http.get(`${LM}/initiatives/:initiativeId/ticket`, () => HttpResponse.json(fx.lmInitiativeTicket)),
  http.post(`${LM}/initiatives/:initiativeId/ticket`, () => created(fx.lmInitiativeTicket)),
  http.delete(`${LM}/initiatives/:initiativeId/ticket`, () => noContent()),
  http.get(`${LM}/initiatives/:initiativeId/opportunity`, () =>
    HttpResponse.json(fx.lmInitiativeOpportunity)
  ),
  http.post(`${LM}/initiatives/:initiativeId/opportunity`, () =>
    created(fx.lmInitiativeOpportunity)
  ),
  http.delete(`${LM}/initiatives/:initiativeId/opportunity`, () => noContent()),
  http.post(`${LM}/initiatives/:initiativeId/opportunities/:opportunityId`, () => noContent()),
  http.get(`${LM}/initiatives/:initiativeId/meetings`, () => data([fx.lmMeeting])),
  http.put(`${LM}/initiatives/:initiativeId/meetings/:meetingId`, () => noContent()),
  http.delete(`${LM}/initiatives/:initiativeId/meetings/:meetingId`, () => noContent()),
  http.get(`${LM}/initiatives/:initiativeId/goals`, () => data([fx.lmGoal])),
  http.post(`${LM}/initiatives/:initiativeId/goals/:goalId`, () => noContent()),
  http.delete(`${LM}/initiatives/:initiativeId/goals/:goalId`, () => noContent()),
  http.get(`${LM}/initiatives/:initiativeId/action-items`, () => data([fx.lmActionItem])),
  http.post(`${LM}/initiatives/:initiativeId/action-items/:actionItemId`, () => noContent()),
  http.delete(`${LM}/initiatives/:initiativeId/action-items/:actionItemId`, () => noContent()),
  http.get(`${LM}/initiatives/:initiativeId/quotes`, () => data([fx.lmInitiativeQuote])),
  http.get(`${LM}/initiatives/:initiativeId/pdf`, () => pdf()),
  http.put(`${LM}/initiatives/:initiativeId/assets`, () => noContent()),
  http.post(`${LM}/initiatives/:initiativeId/assets/detach`, () => noContent()),
  http.post(`${LM}/initiatives/:initiativeId/template/:initiativeTemplateId/apply`, () =>
    noContent()
  ),
  http.get(`${LM}/initiative-templates`, () => list([fx.lmInitiativeTemplate])),
  http.post(`${LM}/initiative-templates`, () => created(fx.lmInitiativeTemplate)),
  http.get(`${LM}/initiative-templates/:initiativeTemplateId`, () =>
    HttpResponse.json(fx.lmInitiativeTemplate)
  ),
  http.put(`${LM}/initiative-templates/:initiativeTemplateId`, () =>
    HttpResponse.json(fx.lmInitiativeTemplate)
  ),
  http.delete(`${LM}/initiative-templates/:initiativeTemplateId`, () => noContent()),
  http.post(`${LM}/initiative-templates/:initiativeTemplateId/duplicate`, () =>
    created(fx.lmInitiativeTemplate)
  ),

  // --- lmGoals ---
  http.get(`${LM}/goal-templates`, () => data([fx.lmGoalTemplate])),
  http.post(`${LM}/goal-templates`, () => created(fx.lmGoalTemplate)),
  http.get(`${LM}/goal-templates/:goalTemplateId`, () => HttpResponse.json(fx.lmGoalTemplate)),
  http.put(`${LM}/goal-templates/:goalTemplateId`, () => HttpResponse.json(fx.lmGoalTemplate)),
  http.delete(`${LM}/goal-templates/:goalTemplateId`, () => noContent()),
  http.post(`${LM}/goals/create-from/template/:goalTemplateId`, () => created(fx.lmGoal)),
  http.get(`${LM}/goals`, () => list([fx.lmGoal])),
  http.post(`${LM}/goals`, () => created(fx.lmGoal)),
  http.get(`${LM}/goals/:id`, () => HttpResponse.json(fx.lmGoal)),
  http.put(`${LM}/goals/:id`, () => HttpResponse.json(fx.lmGoal)),
  http.delete(`${LM}/goals/:id`, () => noContent()),
  http.put(`${LM}/goals/:id/status`, () => noContent()),
  http.put(`${LM}/goals/:id/schedule`, () => noContent()),
  http.get(`${LM}/goals/:goalId/meetings`, () => data([fx.lmMeeting])),
  http.post(`${LM}/goals/:goalId/meetings/:meetingId`, () => noContent()),
  http.delete(`${LM}/goals/:goalId/meetings/:meetingId`, () => noContent()),
  http.get(`${LM}/goals/:goalId/initiatives`, () => data([fx.lmInitiative])),
  http.post(`${LM}/goals/:goalId/initiatives/:initiativeId`, () => noContent()),
  http.delete(`${LM}/goals/:goalId/initiatives/:initiativeId`, () => noContent()),
  http.get(`${LM}/goals/:goalId/action-items`, () => data([fx.lmActionItem])),
  http.post(`${LM}/goals/:goalId/action-items/:actionItemId`, () => noContent()),
  http.delete(`${LM}/goals/:goalId/action-items/:actionItemId`, () => noContent()),

  // --- lmMeetings ---
  http.post(`${LM2}/meetings`, () => created(fx.lmMeeting)),
  http.put(`${LM2}/meetings/:id`, () => HttpResponse.json(fx.lmMeeting)),
  http.get(`${LM}/meeting-types`, () => data([fx.lmMeetingType])),
  http.post(`${LM}/meeting-types`, () => created(fx.lmMeetingType)),
  http.put(`${LM}/meeting-types/:meetingTypeId`, () => HttpResponse.json(fx.lmMeetingType)),
  http.delete(`${LM}/meeting-types/:meetingTypeId`, () => noContent()),
  http.get(`${LM}/meetings`, () => list([fx.lmMeeting])),
  http.post(`${LM}/meetings`, () => created(fx.lmMeeting)),
  http.get(`${LM}/meetings/:id`, () => HttpResponse.json(fx.lmMeeting)),
  http.put(`${LM}/meetings/:id`, () => HttpResponse.json(fx.lmMeeting)),
  http.delete(`${LM}/meetings/:id`, () => noContent()),
  http.put(`${LM}/meetings/:id/completion-status`, () => noContent()),
  http.post(`${LM}/meetings/:id/attendees/users/delete`, () => noContent()),
  http.post(`${LM}/meetings/:id/attendees/users`, () => noContent()),
  http.post(`${LM}/meetings/:id/attendees/contacts/delete`, () => noContent()),
  http.post(`${LM}/meetings/:id/attendees/contacts`, () => noContent()),
  http.get(`${LM}/meetings/:meetingId/initiatives`, () => data([fx.lmInitiative])),
  http.post(`${LM}/meetings/:meetingId/initiatives/:initiativeId`, () => noContent()),
  http.delete(`${LM}/meetings/:meetingId/initiatives/:initiativeId`, () => noContent()),
  http.get(`${LM}/meetings/:meetingId/goals`, () => data([fx.lmGoal])),
  http.post(`${LM}/meetings/:meetingId/goals/:goalId`, () => noContent()),
  http.delete(`${LM}/meetings/:meetingId/goals/:goalId`, () => noContent()),
  http.get(`${LM}/meetings/:meetingId/action-items`, () => data([fx.lmActionItem])),
  http.post(`${LM}/meetings/:meetingId/action-items/:actionItemId`, () => noContent()),
  http.delete(`${LM}/meetings/:meetingId/action-items/:actionItemId`, () => noContent()),

  // --- lmActionItems ---
  http.get(`${LM}/action-items`, () => list([fx.lmActionItem])),
  http.post(`${LM}/action-items`, () => created(fx.lmActionItem)),
  http.get(`${LM}/action-items/:id`, () => HttpResponse.json(fx.lmActionItem)),
  http.put(`${LM}/action-items/:id`, () => HttpResponse.json(fx.lmActionItem)),
  http.delete(`${LM}/action-items/:id`, () => noContent()),
  http.post(`${LM}/action-items/:id/reposition`, () => noContent()),
  http.put(`${LM}/action-items/:id/pin`, () => noContent()),
  http.put(`${LM}/action-items/:id/completion-status`, () => noContent()),

  // --- lmAssessments ---
  http.get(`${LM}/assessment-templates`, () => data([fx.lmAssessmentTemplate])),
  http.post(`${LM}/assessment-templates`, () => created(fx.lmAssessmentTemplate)),
  http.get(`${LM}/assessment-templates/:assessmentTemplateId`, () =>
    HttpResponse.json(fx.lmAssessmentTemplate)
  ),
  http.put(`${LM}/assessment-templates/:assessmentTemplateId`, () =>
    HttpResponse.json(fx.lmAssessmentTemplate)
  ),
  http.delete(`${LM}/assessment-templates/:assessmentTemplateId`, () => noContent()),
  http.get(`${LM}/assessments`, () => list([fx.lmAssessment])),
  http.post(`${LM}/assessments`, () => created(fx.lmAssessment)),
  http.get(`${LM}/assessments/:id`, () => HttpResponse.json(fx.lmAssessment)),
  http.put(`${LM}/assessments/:id`, () => HttpResponse.json(fx.lmAssessment)),
  http.delete(`${LM}/assessments/:id`, () => noContent()),
  http.put(`${LM}/assessments/:id/evaluate`, () => noContent()),
  http.put(`${LM}/assessments/:id/completion-status`, () => noContent()),
  http.put(`${LM}/assessments/:id/internal-comment`, () => noContent()),
  http.put(`${LM}/assessments/:assessmentId/questions/:questionId/comment/public`, () =>
    noContent()
  ),
  http.put(`${LM}/assessments/:assessmentId/questions/:questionId/comment/internal`, () =>
    noContent()
  ),

  // --- lmDeliverables (literal routes before :deliverableId) ---
  http.get(`${LM}/deliverables/catalog/integrations`, () => data([fx.lmDeliverableIntegration])),
  http.get(`${LM}/deliverables/templates/catalog/components`, () =>
    data([fx.lmDeliverableCatalogComponent])
  ),
  http.get(`${LM}/deliverables/templates`, () => data([fx.lmDeliverableTemplate])),
  http.post(`${LM}/deliverables/templates`, () => created(fx.lmDeliverableTemplate)),
  http.post(`${LM}/deliverables/templates/create-from/template/:templateId`, () =>
    created(fx.lmDeliverableTemplate)
  ),
  http.post(`${LM}/deliverables/templates/create-from/deliverable/:deliverableId`, () =>
    created(fx.lmDeliverableTemplate)
  ),
  http.get(`${LM}/deliverables/templates/:templateId`, () =>
    HttpResponse.json(fx.lmDeliverableTemplate)
  ),
  http.patch(`${LM}/deliverables/templates/:templateId`, () =>
    HttpResponse.json(fx.lmDeliverableTemplate)
  ),
  http.delete(`${LM}/deliverables/templates/:templateId`, () => noContent()),
  http.delete(`${LM}/deliverables/templates/:templateId/sections/:sectionId`, () => noContent()),
  http.delete(
    `${LM}/deliverables/templates/:templateId/sections/:sectionId/components/:componentId`,
    () => noContent()
  ),
  http.get(`${LM}/deliverables`, () => list([fx.lmDeliverable])),
  http.get(`${LM}/deliverables/:deliverableId/pdf`, () => pdf()),
  http.get(`${LM}/deliverables/:deliverableId/presentation`, () =>
    HttpResponse.json(fx.lmDeliverablePresentation)
  ),
  http.get(`${LM}/deliverables/:deliverableId/shares/general-link`, () =>
    HttpResponse.json(fx.lmDeliverableShareLink)
  ),
  http.post(`${LM}/deliverables/:deliverableId/shares/general-link`, () =>
    created(fx.lmDeliverableShareLink)
  ),
  http.post(`${LM}/deliverables/:deliverableId/shares/general-link/regenerate`, () =>
    HttpResponse.json(fx.lmDeliverableShareLink)
  ),
  http.post(`${LM}/deliverables/:deliverableId/shares/general-link/revoke`, () => noContent()),
  http.get(`${LM}/deliverables/:deliverableId`, () => HttpResponse.json(fx.lmDeliverable)),
  http.patch(`${LM}/deliverables/:deliverableId`, () => HttpResponse.json(fx.lmDeliverable)),
  http.delete(`${LM}/deliverables/:deliverableId`, () => noContent()),
  http.post(`${LM}/deliverables/:deliverableId/sections/:sectionId/refresh`, () => noContent()),
  http.delete(`${LM}/deliverables/:deliverableId/sections/:sectionId`, () => noContent()),
  http.post(
    `${LM}/deliverables/:deliverableId/sections/:sectionId/components/:componentId/refresh`,
    () => noContent()
  ),
  http.delete(
    `${LM}/deliverables/:deliverableId/sections/:sectionId/components/:componentId`,
    () => noContent()
  ),
  http.get(`${LM}/clients/:clientId/deliverables`, () => data([fx.lmDeliverable])),
  http.post(`${LM}/clients/:clientId/deliverables`, () => created(fx.lmDeliverable)),
  http.post(`${LM}/clients/:clientId/deliverables/create-from/template/:templateId`, () =>
    created(fx.lmDeliverable)
  ),
  http.get(`${LM}/clients/:clientId/deliverables/catalog/components`, () =>
    data([fx.lmDeliverableCatalogComponent])
  ),
  http.get(`${LM}/clients/:clientId/deliverables/integrations/integrated`, () =>
    data([fx.lmDeliverableIntegration])
  ),

  // --- lmBudget ---
  http.get(`${LM}/budget/:clientId/summary`, () => HttpResponse.json(fx.lmBudgetSummary)),
  http.get(`${LM}/budget/:clientId/it-debt`, () => list([fx.lmBudgetItDebtEntry])),
  http.get(`${LM}/budget/:clientId/initiatives`, () => list([fx.lmBudgetInitiativeEntry])),
  http.get(`${LM}/budget/:clientId/contracts`, () => list([fx.lmBudgetContractEntry])),
  http.get(`${LM}/budget/:clientId/forecast/pdf`, () => pdf()),
  http.get(`${LM}/budget/:clientId/forecast/detail/pdf`, () => pdf()),
  http.get(`${LM}/budget/:clientId/forecast/csv`, () => csv()),
  http.get(`${LM}/budget/:clientId/availabilities`, () =>
    HttpResponse.json(fx.lmBudgetAvailabilities)
  ),

  // --- lmContracts ---
  http.get(`${LM}/contracts`, () => list([fx.lmContract])),
  http.post(`${LM}/contracts`, () => created(fx.lmContract)),
  http.get(`${LM}/contracts/:id`, () => HttpResponse.json(fx.lmContract)),
  http.put(`${LM}/contracts/:id`, () => HttpResponse.json(fx.lmContract)),
  http.delete(`${LM}/contracts/:id`, () => noContent()),
  http.put(`${LM}/contracts/:contractId/assets`, () => noContent()),
  http.post(`${LM}/contracts/:contractId/assets/delete`, () => noContent()),

  // --- lmWorkspace ---
  http.get(`${LM}/user/identity`, () => HttpResponse.json(fx.lmUserIdentity)),
  http.get(`${LM}/tickets/create-fields`, () => HttpResponse.json(fx.lmTicketCreateFields)),
  http.get(`${LM}/opportunities/create-fields`, () =>
    HttpResponse.json(fx.lmOpportunityCreateFields)
  ),
  http.get(`${LM}/opportunities`, () => data([fx.lmOpportunity])),
  http.get(`${LM}/notes`, () => list([fx.lmNote])),
  http.post(`${LM}/notes`, () => created(fx.lmNote)),
  http.get(`${LM}/notes/:id`, () => HttpResponse.json(fx.lmNote)),
  http.put(`${LM}/notes/:id`, () => HttpResponse.json(fx.lmNote)),
  http.delete(`${LM}/notes/:id`, () => noContent()),
  http.put(`${LM}/notes/:id/archive-status`, () => noContent()),
  http.get(`${LM}/user-ui-states/:stateKey`, () => HttpResponse.json(fx.lmUserUiState)),
  http.put(`${LM}/user-ui-states/:stateKey`, () => noContent()),
  http.get(`${LM}/insights`, () => data([fx.lmInsight])),
  http.post(`${LM}/saas-management/clients/:clientId/enrollment-tokens`, () =>
    created(fx.lmEnrollmentToken)
  ),
  http.get(`${LM}/saas-management/clients/:clientId/saas-utilization/summary`, () =>
    HttpResponse.json(fx.lmSaasUtilizationSummary)
  ),
];
