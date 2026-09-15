## [1.0.1](https://github.com/WYRE-AI/node-scalepad/compare/v1.0.0...v1.0.1) (2026-08-25)


### Bug Fixes

* migrate to WYRE-AI org (npm scope, ghcr namespace, registry) ([#1](https://github.com/WYRE-AI/node-scalepad/issues/1)) ([197dd86](https://github.com/WYRE-AI/node-scalepad/commit/197dd86ed7345c5b22302dd93779d2a1280dade2))

# 1.0.0 (2026-07-26)


### Features

* initial ScalePad API client — Core, Lifecycle Manager, ControlMap, Backup Radar, and Quoter coverage ([f40ab88](https://github.com/wyre-technology/node-scalepad/commit/f40ab888a02c970a15906d1263418c3d1f0594ef))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Releases are cut automatically by semantic-release from conventional commits.

## [Unreleased]

### Added

- **Release workflow no longer persists a write-scoped git credential across `npm ci`.** The release job declares `contents: write`, which overrides this repo's read-only default workflow permission, so `actions/checkout`'s default persisted credential was write-scoped and lived in `.git/config` through dependency install, build and test — readable by any compromised dependency lifecycle script. `persist-credentials: false` is semantic-release's own documented GitHub Actions recipe; it authenticates its pushes from `GITHUB_TOKEN` directly and never needed the persisted credential. (CWE-250)

- Initial SDK core: `ScalePadClient` composition root, native-fetch HTTP client
  with exponential backoff and `Retry-After`-aware 429 handling, token-bucket
  rate limiter (50 requests / 5 seconds), typed error hierarchy, cursor
  pagination helpers, ScalePad API-key auth, and Quoter OAuth2
  client-credentials auth with refresh-and-retry-once on 401.
