/** Shared fixtures for the ScalePad Core product (clients, assets, service). */

export const coreClient = {
  id: 'client-1',
  name: 'Acme Corp',
  lifecycle: 'active',
  num_contacts: 3,
  num_hardware_assets: 12,
};

export const coreContact = {
  id: 'contact-1',
  title: 'CTO',
  client: { id: 'client-1', name: 'Acme Corp' },
};

export const coreMember = {
  id: 'member-1',
  title: 'vCIO',
  is_scalepad_user: true,
};

export const coreOpportunity = {
  id: 'opp-1',
  title: 'Server refresh',
  is_active: true,
  probability: 60,
};

export const coreSite = {
  id: 'site-1',
  client: { id: 'client-1', name: 'Acme Corp' },
};

export const coreHardwareAsset = {
  id: 'hw-1',
  name: 'WORKSTATION-1',
  serial_number: 'SN-0001',
  type: 'workstation',
};

export const coreSaasAsset = {
  id: 'saas-1',
  status: 'active',
  tenant_domain: 'acme.example.com',
};

export const coreSaasUser = {
  id: 'saas-user-1',
  client: { id: 'client-1', name: 'Acme Corp' },
};

export const coreProductCatalogRecord = {
  id: 'prod-1',
  name: 'Microsoft 365 Business Premium',
  category: 'productivity',
  is_active: true,
};

export const coreIntegrationConfiguration = {
  id: 'intcfg-1',
  vendor: { id: 'vendor-1', brand_name: 'Autotask' },
};

export const coreIntegrationVendor = {
  id: 'vendor-1',
  name: 'Autotask',
  category: 'psa',
};

export const coreContract = {
  id: 'contract-1',
  name: 'Managed Services Agreement',
  status: 'active',
  is_recurring: true,
};

export const coreTicket = {
  id: 'ticket-1',
  category: 'service_request',
  client: { id: 'client-1', name: 'Acme Corp' },
};
