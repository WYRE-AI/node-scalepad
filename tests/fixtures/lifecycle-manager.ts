/** Shared fixtures for the Lifecycle Manager product. */

// --- Clients ---
export const lmClient = { id: 'lm-client-1', name: 'Acme Corp' };
export const lmContact = {
  id: 'lm-contact-1',
  name: 'Jane Doe',
  email: 'jane@acme.example.com',
  is_hidden: false,
};
export const lmClientGroup = { id: 'group-1', name: 'Managed Clients' };
export const lmMember = { id: 'lm-member-1', name: 'Sam Smith', email: 'sam@msp.example.com' };
export const lmActiveUser = { id: 'user-1', name: 'Ann Admin', email: 'ann@msp.example.com' };

// --- Assets ---
export const lmWarrantyPricing = { id: 'wp-1', warranty_type: 'server', price: { amount: 199 } };
export const lmHardwareReplacementSettings = { client_id: 'lm-client-1', replacement_cycle_months: 48 };
export const lmHardwareDashboard = { total_assets: 42, needs_replacement: 5 };
export const lmHardwareOverview = { hardware_key: 'hw-key-1', name: 'SERVER-1' };
export const lmHardwareAsset = {
  id: 'lm-hw-1',
  hardware_key: 'hw-key-1',
  name: 'SERVER-1',
  serial_number: 'SN-1000',
};
export const lmHardwareLifecycle = { id: 'lc-1', serial_number: 'SN-1000', client_id: 'lm-client-1' };
export const lmAttachedInitiative = { id: 'init-1', name: 'Server refresh' };
export const lmAttachedAgreement = { id: 'lm-contract-1', name: 'Hardware agreement' };

// --- Initiatives ---
export const lmInitiative = {
  id: 'init-1',
  name: 'Server refresh',
  status: 'scheduled',
  priority: 'high',
};
export const lmInitiativeTemplate = { id: 'init-tpl-1', name: 'Workstation refresh template' };
export const lmInitiativeTicket = { id: 'psa-ticket-1', status: 'open' };
export const lmInitiativeOpportunity = { id: 'psa-opp-1', title: 'Server refresh opportunity' };
export const lmInitiativeQuote = { id: 'quote-1', name: 'Dell quote' };

// --- Goals ---
export const lmGoal = { id: 'goal-1', title: 'Improve security posture', status: 'in_progress' };
export const lmGoalTemplate = { id: 'goal-tpl-1', title: 'Security baseline' };

// --- Meetings ---
export const lmMeeting = {
  id: 'meeting-1',
  title: 'QBR Q3',
  type: 'qbr',
  is_completed: false,
};
export const lmMeetingType = { id: 'mt-1', label: 'QBR' };

// --- Action items ---
export const lmActionItem = {
  id: 'ai-1',
  description: 'Order replacement server',
  is_completed: false,
  is_pinned: false,
};

// --- Assessments ---
export const lmAssessment = { id: 'assess-1', title: 'Annual security assessment', status: 'open' };
export const lmAssessmentTemplate = { id: 'assess-tpl-1', title: 'Security assessment template' };

// --- Deliverables ---
export const lmDeliverable = { id: 'deliv-1', name: 'Q3 Technology Report', status: 'draft' };
export const lmDeliverableTemplate = { id: 'deliv-tpl-1', name: 'QBR deck template' };
export const lmDeliverableCatalogComponent = { id: 'comp-1', name: 'Asset summary' };
export const lmDeliverableIntegration = { id: 'integ-1', name: 'Backup Radar' };
export const lmDeliverableShareLink = { url: 'https://share.scalepad.com/d/deliv-1' };
export const lmDeliverablePresentation = { id: 'deliv-1', slides: [] };

// --- Budget ---
export const lmBudgetSummary = { client_id: 'lm-client-1', total: 125000 };
export const lmBudgetItDebtEntry = { id: 'debt-1', name: 'Aging servers' };
export const lmBudgetInitiativeEntry = { id: 'init-1', name: 'Server refresh', status: 'scheduled' };
export const lmBudgetContractEntry = { id: 'lm-contract-1', name: 'Microsoft 365 agreement' };
export const lmBudgetAvailabilities = { frequencies: ['quarterly', 'yearly'] };

// --- Contracts ---
export const lmContract = { id: 'lm-contract-1', name: 'Microsoft 365 agreement', expiry_status: 'active' };

// --- Workspace ---
export const lmUserIdentity = { id: 'user-1', name: 'Ann Admin', email: 'ann@msp.example.com' };
export const lmTicketCreateFields = { fields: [{ name: 'board', required: true }] };
export const lmOpportunityCreateFields = { fields: [{ name: 'stage', required: true }] };
export const lmOpportunity = { id: 'lm-opp-1', title: 'Server refresh opportunity', is_active: true };
export const lmNote = { id: 'note-1', title: 'Onboarding notes', is_archived: false };
export const lmUserUiState = { columns: ['name', 'status'] };
export const lmInsight = { id: 'insight-1', name: 'Warranty expirations' };
export const lmEnrollmentToken = { token: 'enroll-token-1', expires_at: '2027-01-01T00:00:00Z' };
export const lmSaasUtilizationSummary = { client_id: 'lm-client-1', licensed: 120, active: 96 };

/** Binary body used by PDF/XLSX export handlers ("%PDF"). */
export const lmPdfBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46]);
/** CSV body used by CSV export handlers. */
export const lmCsvBody = 'name,status\nServer refresh,scheduled\n';
