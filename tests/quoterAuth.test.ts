import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { AuthenticationError, ScalePadClient } from '../src/index.js';
import { server } from './mocks/server.js';
import { quoterTokenPair } from './fixtures/quoter.js';

const STANDALONE = 'https://api.quoter.com/v1';
const client = new ScalePadClient({ apiKey: 'test-key' });

describe('quoterAuth', () => {
  it('exchanges client credentials for a token pair', async () => {
    expect(
      await client.quoterAuth.authorize({ client_id: 'client-id', secret: 'client-secret' })
    ).toEqual(quoterTokenPair);
  });

  it('defaults grant_type to client_credentials', async () => {
    let captured: unknown;
    server.use(
      http.post(`${STANDALONE}/auth/oauth/authorize`, async ({ request }) => {
        captured = await request.json();
        return HttpResponse.json(quoterTokenPair);
      })
    );
    await client.quoterAuth.authorize({ client_id: 'client-id', secret: 'client-secret' });
    expect(captured).toEqual({
      client_id: 'client-id',
      secret: 'client-secret',
      grant_type: 'client_credentials',
    });
  });

  it('exchanges a refresh token for a new token pair', async () => {
    expect(await client.quoterAuth.refresh({ refresh_token: 'refresh-token-1' })).toEqual(
      quoterTokenPair
    );
  });

  it('throws AuthenticationError on invalid credentials', async () => {
    server.use(
      http.post(`${STANDALONE}/auth/oauth/authorize`, () =>
        HttpResponse.json({ message: 'invalid client' }, { status: 401 })
      )
    );
    await expect(
      client.quoterAuth.authorize({ client_id: 'bad', secret: 'bad' })
    ).rejects.toBeInstanceOf(AuthenticationError);
  });
});
