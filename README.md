# @wyre-technology/node-scalepad

Node.js client library for the ScalePad platform APIs — **Core**, **Lifecycle
Manager**, **ControlMap**, **Backup Radar**, and **Quoter** — with zero runtime
dependencies (native `fetch` only).

## Installation

The package is published to GitHub Packages. Add to your `.npmrc`:

```ini
@wyre-technology:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then:

```bash
export NODE_AUTH_TOKEN=$(gh auth token)
npm install @wyre-technology/node-scalepad
```

## Usage

```ts
import { ScalePadClient } from '@wyre-technology/node-scalepad';

const client = new ScalePadClient({
  apiKey: process.env.SCALEPAD_API_KEY!,
});

// Core platform data
const clients = await client.coreClients.list();

// Lifecycle Manager
const initiatives = await client.lmInitiatives.list();

// ControlMap (region-aware)
const risks = await client.cmRisks.list();

// Quoter (ScalePad-hosted by default)
const quotes = await client.quoterQuotes.list();
```

## Configuration

| Option               | Required | Default                   | Description                                                                                          |
| -------------------- | -------- | ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `apiKey`             | yes      | —                         | ScalePad platform API key (generated in the ScalePad app by an Administrator). Sent as `x-api-key`.  |
| `region`             | no       | `us`                      | Data-residency region: `us`, `eu`, `ca`, or `au`. Applies to ControlMap (us/eu/ca/au) and Backup Radar (us/eu). Core and Lifecycle Manager are US-only. |
| `quoterClientId`     | no       | —                         | Quoter OAuth client ID — only for the standalone `api.quoter.com` API (Account Owner generates it in Quoter Account > API Keys). |
| `quoterClientSecret` | no       | —                         | Quoter OAuth client secret, paired with `quoterClientId`.                                            |
| `baseUrl`            | no       | `https://api.scalepad.com`| Override for the ScalePad platform base URL.                                                         |
| `quoterBaseUrl`      | no       | `https://api.quoter.com`  | Override for the standalone Quoter base URL.                                                         |
| `maxRetries`         | no       | `3`                       | Retries for network errors, 429s, and 5xx responses.                                                 |
| `rateLimit`          | no       | `50 req / 5 s`            | Token-bucket override: `{ maxRequests, windowMs }`.                                                  |

## Products and resources

One ScalePad API key covers every product; endpoints for a product you are not
subscribed to return HTTP 402 (`PaymentRequiredError`).

| Product           | Resources                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Core              | `coreClients`, `coreAssets`, `coreService`                                                                                                             |
| Lifecycle Manager | `lmClients`, `lmAssets`, `lmInitiatives`, `lmGoals`, `lmMeetings`, `lmActionItems`, `lmAssessments`, `lmDeliverables`, `lmBudget`, `lmContracts`, `lmWorkspace` |
| ControlMap        | `cmHealth`, `cmRisks`, `cmControls`, `cmEvidence`, `cmPolicies`, `cmFrameworks`, `cmAssessments`, `cmActionItems`                                       |
| Backup Radar      | `brBackups`                                                                                                                                            |
| Quoter            | `quoterQuotes`, `quoterCatalog`, `quoterContacts`, `quoterSuppliers`, `quoterAuth`                                                                     |

## Quoter: hosted vs standalone

Quoter is reachable two ways; the SDK picks automatically:

- **ScalePad-hosted (default, recommended):** `https://api.scalepad.com/quoter`
  with your ScalePad API key. Kebab-case paths, shared 50 req/5 s rate limit,
  and a superset surface (fetch/publish quote, quote sections).
- **Standalone (`api.quoter.com`):** used when you supply `quoterClientId` +
  `quoterClientSecret`. OAuth2 client_credentials — the SDK mints a Bearer
  access token (1 h TTL), refreshes it via `POST /v1/auth/refresh`, and on a
  401 refreshes and retries the request once. 5 req/s rate limit, `page` +
  `limit` pagination, and snake_case paths (the SDK's canonical paths follow
  the hosted kebab-case form).

`client.quoterAuth` always targets the standalone API — its authorize/refresh
endpoints exist only there.

## Errors

All API failures throw a subclass of `ScalePadError` carrying `statusCode` and
the raw `response` body:

| Error                  | Status | Meaning                                            |
| ---------------------- | ------ | -------------------------------------------------- |
| `ValidationError`      | 400    | Bad request (`errors` array when the API sends one)|
| `AuthenticationError`  | 401    | Invalid/missing credentials                        |
| `PaymentRequiredError` | 402    | No active subscription for that product            |
| `ForbiddenError`       | 403    | Key lacks access                                   |
| `NotFoundError`        | 404    | Resource not found                                 |
| `RateLimitError`       | 429    | Rate limited (`retryAfter` seconds)                |
| `ServerError`          | 5xx    | Upstream failure (retried automatically)           |

## Pagination

ScalePad platform APIs paginate with `cursor` + `page_size` (1–200). The
`paginate` helper walks every page:

```ts
import { paginate } from '@wyre-technology/node-scalepad';

for await (const item of paginate((cursor) =>
  client.coreClients.list({ cursor, page_size: 200 })
)) {
  console.log(item);
}
```

The standalone Quoter API uses `page` + `limit` (max 100) instead.

## Rate limiting

ScalePad allows 50 requests per 5 seconds per API key across all products. The
client enforces this locally with a token bucket, and additionally honors
`Retry-After` on any 429 the API returns. Standalone Quoter traffic gets its
own 5 req/s bucket.

## Development

```bash
export NODE_AUTH_TOKEN=$(gh auth token)
npm ci
npm run build   # tsup — dual ESM + CJS with .d.ts
npm test        # vitest + msw
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for conventions.

## License

Apache-2.0 — see [LICENSE](LICENSE).
