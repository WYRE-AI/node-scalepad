/**
 * MSW handlers for the ScalePad Core product (fixtures live in
 * ../fixtures/core.ts).
 */
import { http, HttpResponse, type RequestHandler } from 'msw';

import * as fx from '../fixtures/core.js';

const BASE = 'https://api.scalepad.com';

const list = (items: unknown[]) => HttpResponse.json({ data: items, next_cursor: null });

export const coreHandlers: RequestHandler[] = [
  // coreClients
  http.get(`${BASE}/core/v1/clients`, () => list([fx.coreClient])),
  http.get(`${BASE}/core/v1/clients/:id`, () => HttpResponse.json(fx.coreClient)),
  http.post(`${BASE}/core/v1/contacts`, () => list([fx.coreContact])),
  http.get(`${BASE}/core/v1/contacts/:id`, () => HttpResponse.json(fx.coreContact)),
  http.post(`${BASE}/core/v1/members`, () => list([fx.coreMember])),
  http.get(`${BASE}/core/v1/members/:id`, () => HttpResponse.json(fx.coreMember)),
  http.get(`${BASE}/core/v1/opportunities`, () => list([fx.coreOpportunity])),
  http.get(`${BASE}/core/v1/opportunities/:id`, () => HttpResponse.json(fx.coreOpportunity)),
  http.get(`${BASE}/core/v1/sites`, () => list([fx.coreSite])),
  http.get(`${BASE}/core/v1/sites/:id`, () => HttpResponse.json(fx.coreSite)),

  // coreAssets
  http.get(`${BASE}/core/v1/assets/hardware`, () => list([fx.coreHardwareAsset])),
  http.get(`${BASE}/core/v1/assets/hardware/:id`, () => HttpResponse.json(fx.coreHardwareAsset)),
  http.get(`${BASE}/core/v1/assets/saas`, () => list([fx.coreSaasAsset])),
  http.get(`${BASE}/core/v1/assets/saas-users`, () => list([fx.coreSaasUser])),
  http.get(`${BASE}/core/v1/assets/saas-users/:id`, () => HttpResponse.json(fx.coreSaasUser)),
  http.get(`${BASE}/core/v1/assets/saas/:id`, () => HttpResponse.json(fx.coreSaasAsset)),
  http.get(`${BASE}/core/v1/product-catalog`, () => list([fx.coreProductCatalogRecord])),
  http.get(`${BASE}/core/v1/product-catalog/:id`, () =>
    HttpResponse.json(fx.coreProductCatalogRecord)
  ),

  // coreService
  http.get(`${BASE}/core/v1/integrations/configurations`, () =>
    HttpResponse.json({ data: [fx.coreIntegrationConfiguration] })
  ),
  http.get(`${BASE}/core/v1/integrations/vendors`, () => list([fx.coreIntegrationVendor])),
  http.get(`${BASE}/core/v1/service/contracts`, () => list([fx.coreContract])),
  http.get(`${BASE}/core/v1/service/contracts/:id`, () => HttpResponse.json(fx.coreContract)),
  http.get(`${BASE}/core/v1/service/tickets`, () => list([fx.coreTicket])),
  http.get(`${BASE}/core/v1/service/tickets/:id`, () => HttpResponse.json(fx.coreTicket)),
];
