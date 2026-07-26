# Contributing to node-scalepad

Thanks for contributing! This repo follows the WYRE Technology SDK fleet
conventions.

## Development setup

```bash
export NODE_AUTH_TOKEN=$(gh auth token)   # GitHub Packages has no anonymous read
npm ci
npm run build
npm test
```

- Node.js >= 20 is required.
- The SDK has **zero runtime dependencies** — native `fetch` only. Do not add
  runtime dependencies.
- Tests use [Vitest](https://vitest.dev) with [MSW](https://mswjs.io) for HTTP
  mocking. MSW handlers live in `tests/mocks/handlers-<product>.ts`, one file
  per ScalePad product, aggregated by `tests/mocks/handlers.ts`.

## Project layout

```
src/
├── index.ts          # public barrel
├── client.ts         # ScalePadClient composition root
├── config.ts         # config types + regional base URL resolution
├── auth.ts           # ApiKeyAuth (platform) + QuoterOAuth (standalone Quoter)
├── http.ts           # fetch + retry + backoff + error mapping
├── errors.ts         # ScalePadError hierarchy
├── rate-limiter.ts   # token bucket (50 req / 5 s default)
├── pagination.ts     # cursor + page pagination helpers
├── resources/        # one class per API resource (coreClients.ts, lmGoals.ts, …)
└── types/            # one types module per resource, re-exported by index.ts
```

Contract: `src/resources/<name>.ts` exports `class <PascalName>Resource`
(e.g. `coreClients.ts` exports `CoreClientsResource`), and the matching types
module is `src/types/<name>.ts`.

## Commits and releases

- Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`,
  `fix:`, `docs:`, …). semantic-release derives versions from commit types, so
  the type you pick drives the published version.
- Releases run automatically from `main` via GitHub Actions and publish to
  GitHub Packages (`npm.pkg.github.com`).
- Keep `CHANGELOG.md` accurate — user-facing changes go under `Unreleased`
  (semantic-release folds them into the release notes).

## Pull requests

1. Branch from `main`.
2. Make your change with tests (`npm test` must be green).
3. `npm run lint` (tsc --noEmit) must pass.
4. Open a PR with a conventional-commit-style title.
