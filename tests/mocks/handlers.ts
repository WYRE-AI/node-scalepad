/**
 * Aggregated MSW handlers for every ScalePad product.
 *
 * Contract for the per-product agents: each ./handlers-<product-slug>.ts file
 * exports a `RequestHandler[]` named `<camelCasedSlug>Handlers` (fixtures live
 * inline in the handlers, per fleet convention). This file just concatenates
 * them for tests/mocks/server.ts.
 */
import type { RequestHandler } from 'msw';

import { coreHandlers } from './handlers-core.js';
import { lifecycleManagerHandlers } from './handlers-lifecycle-manager.js';
import { controlmapHandlers } from './handlers-controlmap.js';
import { backupRadarHandlers } from './handlers-backup-radar.js';
import { quoterHandlers } from './handlers-quoter.js';

export const handlers: RequestHandler[] = [
  ...coreHandlers,
  ...lifecycleManagerHandlers,
  ...controlmapHandlers,
  ...backupRadarHandlers,
  ...quoterHandlers,
];
