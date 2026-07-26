import type { HttpClient } from '../http.js';
import type { CursorPaginatedResponse } from '../pagination.js';
import type {
  LmDeliverable,
  LmDeliverableCatalogComponent,
  LmDeliverableCreateFromTemplatePayload,
  LmDeliverableCreatePayload,
  LmDeliverableIntegration,
  LmDeliverableListParams,
  LmDeliverablePresentation,
  LmDeliverableShareLink,
  LmDeliverableTemplate,
  LmDeliverableTemplateCreatePayload,
  LmDeliverableTemplateUpdatePayload,
  LmDeliverableUpdatePayload,
} from '../types/lmDeliverables.js';

/**
 * Lifecycle Manager deliverables surface: deliverables, deliverable
 * templates, catalog components/integrations, sections, and general share
 * links.
 */
export class LmDeliverablesResource {
  constructor(private readonly http: HttpClient) {}

  async list(params?: LmDeliverableListParams): Promise<CursorPaginatedResponse<LmDeliverable>> {
    return this.http.request('/lifecycle-manager/v1/deliverables', {
      params: params as Record<string, unknown>,
    });
  }

  async get(deliverableId: string): Promise<LmDeliverable> {
    return this.http.request(`/lifecycle-manager/v1/deliverables/${deliverableId}`);
  }

  async update(deliverableId: string, payload: LmDeliverableUpdatePayload): Promise<LmDeliverable> {
    return this.http.request(`/lifecycle-manager/v1/deliverables/${deliverableId}`, {
      method: 'PATCH',
      body: payload,
    });
  }

  async delete(deliverableId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/deliverables/${deliverableId}`, {
      method: 'DELETE',
    });
  }

  async downloadPdf(deliverableId: string): Promise<ArrayBuffer> {
    return this.http.request(`/lifecycle-manager/v1/deliverables/${deliverableId}/pdf`);
  }

  async getPresentation(deliverableId: string): Promise<LmDeliverablePresentation> {
    return this.http.request(`/lifecycle-manager/v1/deliverables/${deliverableId}/presentation`);
  }

  // --- Per-client deliverables ---

  async listForClient(clientId: string): Promise<{ data: LmDeliverable[] }> {
    return this.http.request(`/lifecycle-manager/v1/clients/${clientId}/deliverables`);
  }

  async createForClient(
    clientId: string,
    payload: LmDeliverableCreatePayload
  ): Promise<LmDeliverable> {
    return this.http.request(`/lifecycle-manager/v1/clients/${clientId}/deliverables`, {
      method: 'POST',
      body: payload,
    });
  }

  async createFromTemplate(
    clientId: string,
    templateId: string,
    payload?: LmDeliverableCreateFromTemplatePayload
  ): Promise<LmDeliverable> {
    return this.http.request(
      `/lifecycle-manager/v1/clients/${clientId}/deliverables/create-from/template/${templateId}`,
      { method: 'POST', body: payload }
    );
  }

  // --- Catalog ---

  async listClientCatalogComponents(
    clientId: string
  ): Promise<{ data: LmDeliverableCatalogComponent[] }> {
    return this.http.request(
      `/lifecycle-manager/v1/clients/${clientId}/deliverables/catalog/components`
    );
  }

  async listCatalogIntegrations(): Promise<{ data: LmDeliverableIntegration[] }> {
    return this.http.request('/lifecycle-manager/v1/deliverables/catalog/integrations');
  }

  async listIntegratedIntegrations(
    clientId: string
  ): Promise<{ data: LmDeliverableIntegration[] }> {
    return this.http.request(
      `/lifecycle-manager/v1/clients/${clientId}/deliverables/integrations/integrated`
    );
  }

  // --- Sections ---

  async refreshSection(deliverableId: string, sectionId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/${deliverableId}/sections/${sectionId}/refresh`,
      { method: 'POST' }
    );
  }

  async deleteSection(deliverableId: string, sectionId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/${deliverableId}/sections/${sectionId}`,
      { method: 'DELETE' }
    );
  }

  async refreshSectionComponent(
    deliverableId: string,
    sectionId: string,
    componentId: string
  ): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/${deliverableId}/sections/${sectionId}/components/${componentId}/refresh`,
      { method: 'POST' }
    );
  }

  async deleteSectionComponent(
    deliverableId: string,
    sectionId: string,
    componentId: string
  ): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/${deliverableId}/sections/${sectionId}/components/${componentId}`,
      { method: 'DELETE' }
    );
  }

  // --- Templates ---

  async listTemplates(): Promise<{ data: LmDeliverableTemplate[] }> {
    return this.http.request('/lifecycle-manager/v1/deliverables/templates');
  }

  async getTemplate(templateId: string): Promise<LmDeliverableTemplate> {
    return this.http.request(`/lifecycle-manager/v1/deliverables/templates/${templateId}`);
  }

  async createTemplate(payload: LmDeliverableTemplateCreatePayload): Promise<LmDeliverableTemplate> {
    return this.http.request('/lifecycle-manager/v1/deliverables/templates', {
      method: 'POST',
      body: payload,
    });
  }

  async updateTemplate(
    templateId: string,
    payload: LmDeliverableTemplateUpdatePayload
  ): Promise<LmDeliverableTemplate> {
    return this.http.request(`/lifecycle-manager/v1/deliverables/templates/${templateId}`, {
      method: 'PATCH',
      body: payload,
    });
  }

  async deleteTemplate(templateId: string): Promise<void> {
    return this.http.request(`/lifecycle-manager/v1/deliverables/templates/${templateId}`, {
      method: 'DELETE',
    });
  }

  async createTemplateFromTemplate(templateId: string): Promise<LmDeliverableTemplate> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/templates/create-from/template/${templateId}`,
      { method: 'POST' }
    );
  }

  async createTemplateFromDeliverable(deliverableId: string): Promise<LmDeliverableTemplate> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/templates/create-from/deliverable/${deliverableId}`,
      { method: 'POST' }
    );
  }

  async listTemplateCatalogComponents(): Promise<{ data: LmDeliverableCatalogComponent[] }> {
    return this.http.request('/lifecycle-manager/v1/deliverables/templates/catalog/components');
  }

  async deleteTemplateSection(templateId: string, sectionId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/templates/${templateId}/sections/${sectionId}`,
      { method: 'DELETE' }
    );
  }

  async deleteTemplateSectionComponent(
    templateId: string,
    sectionId: string,
    componentId: string
  ): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/templates/${templateId}/sections/${sectionId}/components/${componentId}`,
      { method: 'DELETE' }
    );
  }

  // --- General share links ---

  async getGeneralShareLink(deliverableId: string): Promise<LmDeliverableShareLink> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/${deliverableId}/shares/general-link`
    );
  }

  async createGeneralShareLink(deliverableId: string): Promise<LmDeliverableShareLink> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/${deliverableId}/shares/general-link`,
      { method: 'POST' }
    );
  }

  async regenerateGeneralShareLink(deliverableId: string): Promise<LmDeliverableShareLink> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/${deliverableId}/shares/general-link/regenerate`,
      { method: 'POST' }
    );
  }

  async revokeGeneralShareLink(deliverableId: string): Promise<void> {
    return this.http.request(
      `/lifecycle-manager/v1/deliverables/${deliverableId}/shares/general-link/revoke`,
      { method: 'POST' }
    );
  }
}
