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

- Initial SDK core: `ScalePadClient` composition root, native-fetch HTTP client
  with exponential backoff and `Retry-After`-aware 429 handling, token-bucket
  rate limiter (50 requests / 5 seconds), typed error hierarchy, cursor
  pagination helpers, ScalePad API-key auth, and Quoter OAuth2
  client-credentials auth with refresh-and-retry-once on 401.
