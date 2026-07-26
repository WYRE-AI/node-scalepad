import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  QuoterLineItem,
  QuoterLineItemCreateRequest,
  QuoterQuote,
  QuoterQuoteCreateRequest,
  QuoterQuoteListParams,
  QuoterQuoteSection,
  QuoterQuoteSectionCreateRequest,
  QuoterQuoteTemplate,
  QuoterQuoteTemplateListParams,
  QuoterSectionLineItemRequest,
} from '../types/quoterQuotes.js';

/** Quoter quotes, quote sections, line items, and quote templates. */
export class QuoterQuotesResource {
  constructor(private readonly http: HttpClient) {}

  /** List Quotes — GET /v1/quotes */
  async list(params?: QuoterQuoteListParams): Promise<CursorPaginatedResponse<QuoterQuote>> {
    return this.http.request('/v1/quotes', { params: params as Record<string, unknown> });
  }

  /** Create Quote — POST /v1/quotes */
  async create(body: QuoterQuoteCreateRequest): Promise<QuoterQuote> {
    return this.http.request('/v1/quotes', { method: 'POST', body });
  }

  /** Fetch Quote — GET /v1/quotes/{quote_id} */
  async get(quoteId: string): Promise<QuoterQuote> {
    return this.http.request(`/v1/quotes/${quoteId}`);
  }

  /** Publish Quote — POST /v1/quotes/{quote_id}/publish (irreversible) */
  async publish(quoteId: string): Promise<QuoterQuote> {
    return this.http.request(`/v1/quotes/${quoteId}/publish`, { method: 'POST' });
  }

  /** Create Quote Sections — POST /v1/quotes/{quote_id}/sections */
  async createSection(
    quoteId: string,
    body: QuoterQuoteSectionCreateRequest
  ): Promise<QuoterQuoteSection> {
    return this.http.request(`/v1/quotes/${quoteId}/sections`, { method: 'POST', body });
  }

  /** Create Quote Line Items — POST /v1/quotes/{quote_id}/sections/{section_id}/line-items */
  async createSectionLineItem(
    quoteId: string,
    sectionId: string,
    body: QuoterSectionLineItemRequest
  ): Promise<QuoterLineItem> {
    return this.http.request(`/v1/quotes/${quoteId}/sections/${sectionId}/line-items`, {
      method: 'POST',
      body,
    });
  }

  /** Patch Quote Line Item — PATCH /v1/quotes/{quote_id}/sections/{section_id}/line-items/{line_item_id} */
  async updateSectionLineItem(
    quoteId: string,
    sectionId: string,
    lineItemId: string,
    body: QuoterSectionLineItemRequest
  ): Promise<QuoterLineItem> {
    return this.http.request(
      `/v1/quotes/${quoteId}/sections/${sectionId}/line-items/${lineItemId}`,
      { method: 'PATCH', body }
    );
  }

  /** Create Line Item — POST /v1/line-items */
  async createLineItem(body: QuoterLineItemCreateRequest): Promise<QuoterLineItem> {
    return this.http.request('/v1/line-items', { method: 'POST', body });
  }

  /** List Quote Templates — GET /v1/quote-templates */
  async listTemplates(
    params?: QuoterQuoteTemplateListParams
  ): Promise<CursorPaginatedResponse<QuoterQuoteTemplate>> {
    return this.http.request('/v1/quote-templates', {
      params: params as Record<string, unknown>,
    });
  }
}
