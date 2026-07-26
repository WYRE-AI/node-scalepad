/**
 * ScalePad platform APIs (Core, Lifecycle Manager, ControlMap, Backup Radar,
 * and the ScalePad-hosted Quoter API) paginate with an opaque cursor plus a
 * page_size (1-200).
 */
export interface CursorPaginationParams {
  /** Opaque cursor returned by the previous page. */
  cursor?: string;
  /** Page size, 1-200. */
  page_size?: number;
}

export interface CursorPaginatedResponse<T> {
  data: T[];
  /** Cursor for the next page; absent or null on the last page. */
  next_cursor?: string | null;
}

/**
 * The standalone Quoter API (api.quoter.com) paginates with page + limit
 * (limit max 100) instead of cursors.
 */
export interface PagePaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Walk every item across a cursor-paginated listing.
 *
 * ```ts
 * for await (const item of paginate((cursor) => client.coreClients.list({ cursor }))) {
 *   // ...
 * }
 * ```
 */
export async function* paginate<T>(
  fetchPage: (cursor?: string) => Promise<CursorPaginatedResponse<T>>
): AsyncGenerator<T, void, undefined> {
  let cursor: string | undefined;
  do {
    const page = await fetchPage(cursor);
    for (const item of page.data ?? []) yield item;
    cursor = page.next_cursor ?? undefined;
  } while (cursor);
}
