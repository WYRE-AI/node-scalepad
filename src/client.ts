import { ApiKeyAuth, QuoterOAuth } from './auth.js';
import {
  DEFAULT_BASE_URL,
  DEFAULT_QUOTER_BASE_URL,
  resolveRegionalBaseUrl,
  type ScalePadClientConfig,
} from './config.js';
import { HttpClient } from './http.js';
import { RateLimiter } from './rate-limiter.js';

// Core
import { CoreClientsResource } from './resources/coreClients.js';
import { CoreAssetsResource } from './resources/coreAssets.js';
import { CoreServiceResource } from './resources/coreService.js';
// Lifecycle Manager
import { LmClientsResource } from './resources/lmClients.js';
import { LmAssetsResource } from './resources/lmAssets.js';
import { LmInitiativesResource } from './resources/lmInitiatives.js';
import { LmGoalsResource } from './resources/lmGoals.js';
import { LmMeetingsResource } from './resources/lmMeetings.js';
import { LmActionItemsResource } from './resources/lmActionItems.js';
import { LmAssessmentsResource } from './resources/lmAssessments.js';
import { LmDeliverablesResource } from './resources/lmDeliverables.js';
import { LmBudgetResource } from './resources/lmBudget.js';
import { LmContractsResource } from './resources/lmContracts.js';
import { LmWorkspaceResource } from './resources/lmWorkspace.js';
// ControlMap
import { CmHealthResource } from './resources/cmHealth.js';
import { CmRisksResource } from './resources/cmRisks.js';
import { CmControlsResource } from './resources/cmControls.js';
import { CmEvidenceResource } from './resources/cmEvidence.js';
import { CmPoliciesResource } from './resources/cmPolicies.js';
import { CmFrameworksResource } from './resources/cmFrameworks.js';
import { CmAssessmentsResource } from './resources/cmAssessments.js';
import { CmActionItemsResource } from './resources/cmActionItems.js';
// Backup Radar
import { BrBackupsResource } from './resources/brBackups.js';
// Quoter
import { QuoterQuotesResource } from './resources/quoterQuotes.js';
import { QuoterCatalogResource } from './resources/quoterCatalog.js';
import { QuoterContactsResource } from './resources/quoterContacts.js';
import { QuoterSuppliersResource } from './resources/quoterSuppliers.js';
import { QuoterAuthResource } from './resources/quoterAuth.js';

/**
 * ScalePad platform client covering Core, Lifecycle Manager, ControlMap,
 * Backup Radar, and Quoter. One API key covers every product; endpoints for
 * an unsubscribed product throw PaymentRequiredError (402).
 */
export class ScalePadClient {
  // Core (US-only)
  readonly coreClients: CoreClientsResource;
  readonly coreAssets: CoreAssetsResource;
  readonly coreService: CoreServiceResource;
  // Lifecycle Manager (US-only)
  readonly lmClients: LmClientsResource;
  readonly lmAssets: LmAssetsResource;
  readonly lmInitiatives: LmInitiativesResource;
  readonly lmGoals: LmGoalsResource;
  readonly lmMeetings: LmMeetingsResource;
  readonly lmActionItems: LmActionItemsResource;
  readonly lmAssessments: LmAssessmentsResource;
  readonly lmDeliverables: LmDeliverablesResource;
  readonly lmBudget: LmBudgetResource;
  readonly lmContracts: LmContractsResource;
  readonly lmWorkspace: LmWorkspaceResource;
  // ControlMap (regional: us/eu/ca/au)
  readonly cmHealth: CmHealthResource;
  readonly cmRisks: CmRisksResource;
  readonly cmControls: CmControlsResource;
  readonly cmEvidence: CmEvidenceResource;
  readonly cmPolicies: CmPoliciesResource;
  readonly cmFrameworks: CmFrameworksResource;
  readonly cmAssessments: CmAssessmentsResource;
  readonly cmActionItems: CmActionItemsResource;
  // Backup Radar (regional: us/eu)
  readonly brBackups: BrBackupsResource;
  // Quoter (hosted by default; standalone when OAuth credentials are supplied)
  readonly quoterQuotes: QuoterQuotesResource;
  readonly quoterCatalog: QuoterCatalogResource;
  readonly quoterContacts: QuoterContactsResource;
  readonly quoterSuppliers: QuoterSuppliersResource;
  readonly quoterAuth: QuoterAuthResource;

  constructor(config: ScalePadClientConfig) {
    const maxRetries = config.maxRetries ?? 3;
    // One token bucket per API key: ScalePad's 50-req/5-s limit is shared
    // across every product endpoint.
    const rateLimiter = new RateLimiter(
      config.rateLimit?.maxRequests ?? 50,
      config.rateLimit?.windowMs ?? 5_000
    );
    const auth = new ApiKeyAuth(config.apiKey);

    const platformBaseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    // Core and Lifecycle Manager are US-only.
    const platformHttp = new HttpClient({
      baseUrl: platformBaseUrl,
      auth,
      rateLimiter,
      maxRetries,
    });
    // ControlMap (us/eu/ca/au) and Backup Radar (us/eu) honor the
    // data-residency region.
    const regionalHttp = new HttpClient({
      baseUrl: resolveRegionalBaseUrl(config.region, platformBaseUrl),
      auth,
      rateLimiter,
      maxRetries,
    });

    // Quoter defaults to the ScalePad-hosted path (kebab-case paths,
    // x-api-key, shared rate limit). When standalone OAuth credentials are
    // supplied, quoter resources switch to api.quoter.com (Bearer auth,
    // 5 req/s, snake_case paths — the SDK's canonical paths follow the
    // hosted kebab-case form).
    const quoterStandaloneBaseUrl = config.quoterBaseUrl ?? DEFAULT_QUOTER_BASE_URL;
    const quoterStandaloneRateLimiter = new RateLimiter(5, 1_000);
    const quoterHttp =
      config.quoterClientId && config.quoterClientSecret
        ? new HttpClient({
            baseUrl: quoterStandaloneBaseUrl,
            auth: new QuoterOAuth({
              clientId: config.quoterClientId,
              clientSecret: config.quoterClientSecret,
              baseUrl: quoterStandaloneBaseUrl,
            }),
            rateLimiter: quoterStandaloneRateLimiter,
            maxRetries,
          })
        : new HttpClient({
            baseUrl: `${platformBaseUrl}/quoter`,
            auth,
            rateLimiter,
            maxRetries,
          });
    // Token mint/refresh endpoints exist only on api.quoter.com and are
    // themselves unauthenticated (they take the client credentials in the
    // request body).
    const quoterAuthHttp = new HttpClient({
      baseUrl: quoterStandaloneBaseUrl,
      rateLimiter: quoterStandaloneRateLimiter,
      maxRetries,
    });

    this.coreClients = new CoreClientsResource(platformHttp);
    this.coreAssets = new CoreAssetsResource(platformHttp);
    this.coreService = new CoreServiceResource(platformHttp);

    this.lmClients = new LmClientsResource(platformHttp);
    this.lmAssets = new LmAssetsResource(platformHttp);
    this.lmInitiatives = new LmInitiativesResource(platformHttp);
    this.lmGoals = new LmGoalsResource(platformHttp);
    this.lmMeetings = new LmMeetingsResource(platformHttp);
    this.lmActionItems = new LmActionItemsResource(platformHttp);
    this.lmAssessments = new LmAssessmentsResource(platformHttp);
    this.lmDeliverables = new LmDeliverablesResource(platformHttp);
    this.lmBudget = new LmBudgetResource(platformHttp);
    this.lmContracts = new LmContractsResource(platformHttp);
    this.lmWorkspace = new LmWorkspaceResource(platformHttp);

    this.cmHealth = new CmHealthResource(regionalHttp);
    this.cmRisks = new CmRisksResource(regionalHttp);
    this.cmControls = new CmControlsResource(regionalHttp);
    this.cmEvidence = new CmEvidenceResource(regionalHttp);
    this.cmPolicies = new CmPoliciesResource(regionalHttp);
    this.cmFrameworks = new CmFrameworksResource(regionalHttp);
    this.cmAssessments = new CmAssessmentsResource(regionalHttp);
    this.cmActionItems = new CmActionItemsResource(regionalHttp);

    this.brBackups = new BrBackupsResource(regionalHttp);

    this.quoterQuotes = new QuoterQuotesResource(quoterHttp);
    this.quoterCatalog = new QuoterCatalogResource(quoterHttp);
    this.quoterContacts = new QuoterContactsResource(quoterHttp);
    this.quoterSuppliers = new QuoterSuppliersResource(quoterHttp);
    this.quoterAuth = new QuoterAuthResource(quoterAuthHttp);
  }
}
