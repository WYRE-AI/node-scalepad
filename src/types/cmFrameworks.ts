import type { CmClientRef } from './cmHealth.js';

/** A framework objective (requirement) for a ControlMap client. */
export interface CmObjective {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  status?: string;
  [key: string]: unknown;
}

/** Per-client objective rollup returned by the objective summary endpoints. */
export interface CmObjectiveSummary {
  client?: CmClientRef;
  [key: string]: unknown;
}
