/** Inline fixtures shared by the Quoter MSW handlers and tests. */

export const quoterQuote = {
  id: 'quote-1',
  name: 'Managed Services Proposal',
  stage: 'draft',
  uuid: 'uuid-1',
};
export const quoterQuoteTemplate = { id: 'template-1', title: 'MSP Standard' };
export const quoterQuoteSection = { id: 'qsection-1', name: 'Hardware' };
export const quoterLineItem = { id: 'li-1', name: 'Firewall Appliance', quantity: 1 };

export const quoterCategory = { id: 'category-1', name: 'Networking' };
export const quoterItemGroupAssignment = {
  id: 'iga-1',
  item_group_id: 'group-1',
  item_id: 'item-1',
};
export const quoterItemGroup = { id: 'group-1', name: 'Security Bundle' };
export const quoterItemOptionValue = { id: 'iov-1', name: '16 GB RAM', code: 'RAM16' };
export const quoterItemOption = { id: 'io-1', name: 'Memory', required: true };
export const quoterItemTier = { id: 'tier-1', lower_boundary: 10, price_decimal: '99.00' };
export const quoterItem = { id: 'item-1', name: 'Firewall Appliance', sku: 'FW-100' };
export const quoterManufacturer = { id: 'mfr-1', name: 'Fortinet' };

export const quoterContact = {
  id: 'contact-1',
  first_name: 'Jane',
  last_name: 'Doe',
  organization: 'Acme Corp',
};

export const quoterSupplier = { id: 'supplier-1', name: 'Ingram Micro' };
export const quoterSupplierItem = { mpn: 'FW-100', supplier: 'Ingram Micro', price: '899.00' };
export const quoterDatafeedSupplier = { id: 'dfsupplier-1', name: 'Ingram Micro' };

export const quoterTokenPair = {
  access_token: 'access-token-1',
  refresh_token: 'refresh-token-1',
  expires_in: 3600,
};
