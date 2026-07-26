/**
 * MSW handlers for Quoter. Resource endpoints use the ScalePad-hosted base
 * (https://api.scalepad.com/quoter, the SDK default); the two OAuth token
 * endpoints exist only on the standalone https://api.quoter.com host.
 */
import { http, HttpResponse } from 'msw';

import {
  quoterCategory,
  quoterContact,
  quoterDatafeedSupplier,
  quoterItem,
  quoterItemGroup,
  quoterItemGroupAssignment,
  quoterItemOption,
  quoterItemOptionValue,
  quoterItemTier,
  quoterLineItem,
  quoterManufacturer,
  quoterQuote,
  quoterQuoteSection,
  quoterQuoteTemplate,
  quoterSupplier,
  quoterSupplierItem,
  quoterTokenPair,
} from '../fixtures/quoter.js';

const BASE = 'https://api.scalepad.com/quoter/v1';
const STANDALONE = 'https://api.quoter.com/v1';

const page = <T>(items: T[]) => HttpResponse.json({ data: items, next_cursor: null });
const created = <T extends Record<string, unknown>>(entity: T) =>
  HttpResponse.json(entity, { status: 201 });
const noContent = () => new HttpResponse(null, { status: 204 });

export const quoterHandlers = [
  // --- quoterQuotes ---
  http.get(`${BASE}/quotes`, () => page([quoterQuote])),
  http.post(`${BASE}/quotes`, () => created(quoterQuote)),
  http.get(`${BASE}/quotes/:quoteId`, () => HttpResponse.json(quoterQuote)),
  http.post(`${BASE}/quotes/:quoteId/publish`, () => HttpResponse.json(quoterQuote)),
  http.post(`${BASE}/quotes/:quoteId/sections`, () => created(quoterQuoteSection)),
  http.post(`${BASE}/quotes/:quoteId/sections/:sectionId/line-items`, () =>
    created(quoterLineItem)
  ),
  http.patch(`${BASE}/quotes/:quoteId/sections/:sectionId/line-items/:lineItemId`, () =>
    HttpResponse.json(quoterLineItem)
  ),
  http.post(`${BASE}/line-items`, () => created(quoterLineItem)),
  http.get(`${BASE}/quote-templates`, () => page([quoterQuoteTemplate])),

  // --- quoterCatalog ---
  http.get(`${BASE}/categories`, () => page([quoterCategory])),
  http.post(`${BASE}/categories`, () => created(quoterCategory)),
  http.get(`${BASE}/categories/:id`, () => HttpResponse.json(quoterCategory)),
  http.patch(`${BASE}/categories/:id`, () => HttpResponse.json(quoterCategory)),
  http.delete(`${BASE}/categories/:id`, noContent),
  http.get(`${BASE}/item-group-item-assignments`, () => page([quoterItemGroupAssignment])),
  http.post(`${BASE}/item-group-item-assignments`, () => created(quoterItemGroupAssignment)),
  http.get(`${BASE}/item-group-item-assignments/:id`, () =>
    HttpResponse.json(quoterItemGroupAssignment)
  ),
  http.delete(`${BASE}/item-group-item-assignments/:id`, noContent),
  http.get(`${BASE}/item-groups`, () => page([quoterItemGroup])),
  http.post(`${BASE}/item-groups`, () => created(quoterItemGroup)),
  http.get(`${BASE}/item-groups/:id`, () => HttpResponse.json(quoterItemGroup)),
  http.patch(`${BASE}/item-groups/:id`, () => HttpResponse.json(quoterItemGroup)),
  http.delete(`${BASE}/item-groups/:id`, noContent),
  http.get(`${BASE}/item-option-values`, () => page([quoterItemOptionValue])),
  http.post(`${BASE}/item-option-values`, () => created(quoterItemOptionValue)),
  http.get(`${BASE}/item-option-values/:id`, () => HttpResponse.json(quoterItemOptionValue)),
  http.patch(`${BASE}/item-option-values/:id`, () => HttpResponse.json(quoterItemOptionValue)),
  http.delete(`${BASE}/item-option-values/:id`, noContent),
  http.get(`${BASE}/item-options`, () => page([quoterItemOption])),
  http.post(`${BASE}/item-options`, () => created(quoterItemOption)),
  http.get(`${BASE}/item-options/:id`, () => HttpResponse.json(quoterItemOption)),
  http.patch(`${BASE}/item-options/:id`, () => HttpResponse.json(quoterItemOption)),
  http.delete(`${BASE}/item-options/:id`, noContent),
  http.get(`${BASE}/item-tiers`, () => page([quoterItemTier])),
  http.post(`${BASE}/item-tiers`, () => created(quoterItemTier)),
  http.get(`${BASE}/item-tiers/:id`, () => HttpResponse.json(quoterItemTier)),
  http.patch(`${BASE}/item-tiers/:id`, () => HttpResponse.json(quoterItemTier)),
  http.delete(`${BASE}/item-tiers/:id`, noContent),
  http.get(`${BASE}/items`, () => page([quoterItem])),
  http.post(`${BASE}/items`, () => created(quoterItem)),
  http.get(`${BASE}/items/:id`, () => HttpResponse.json(quoterItem)),
  http.patch(`${BASE}/items/:id`, () => HttpResponse.json(quoterItem)),
  http.delete(`${BASE}/items/:id`, noContent),
  http.get(`${BASE}/manufacturers`, () => page([quoterManufacturer])),
  http.post(`${BASE}/manufacturers`, () => created(quoterManufacturer)),
  http.get(`${BASE}/manufacturers/:id`, () => HttpResponse.json(quoterManufacturer)),
  http.patch(`${BASE}/manufacturers/:id`, () => HttpResponse.json(quoterManufacturer)),
  http.delete(`${BASE}/manufacturers/:id`, noContent),

  // --- quoterContacts ---
  http.get(`${BASE}/contacts`, () => page([quoterContact])),
  http.post(`${BASE}/contacts`, () => created(quoterContact)),
  http.get(`${BASE}/contacts/:id`, () => HttpResponse.json(quoterContact)),
  http.patch(`${BASE}/contacts/:id`, () => HttpResponse.json(quoterContact)),

  // --- quoterSuppliers ---
  http.get(`${BASE}/suppliers`, () => page([quoterSupplier])),
  http.post(`${BASE}/suppliers`, () => created(quoterSupplier)),
  http.get(`${BASE}/suppliers/:id`, () => HttpResponse.json(quoterSupplier)),
  http.patch(`${BASE}/suppliers/:id`, () => HttpResponse.json(quoterSupplier)),
  http.delete(`${BASE}/suppliers/:id`, noContent),
  http.get(`${BASE}/datafeeds/supplier-items`, () => page([quoterSupplierItem])),
  http.get(`${BASE}/datafeeds/suppliers`, () => page([quoterDatafeedSupplier])),

  // --- quoterAuth (standalone api.quoter.com only) ---
  http.post(`${STANDALONE}/auth/oauth/authorize`, () => HttpResponse.json(quoterTokenPair)),
  http.post(`${STANDALONE}/auth/refresh`, () => HttpResponse.json(quoterTokenPair)),
];
