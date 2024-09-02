import { SessionStore, SessionStorePayload } from "@auth0/nextjs-auth0";
import { createClient } from "@vercel/kv";

import type { VercelKV } from "@vercel/kv";

export class Store implements SessionStore {
  constructor(private store: VercelKV) {}

  async get(id: string) {
    return await this.store.get<SessionStorePayload>(id);
  }
  async set(id: string, val: SessionStorePayload) {
    // To set the expiry per item, use `val.header.exp` (in secs)
    const expiryMs = val.header.exp * 1000;
    await this.store.set<SessionStorePayload>(id, val, { pxat: expiryMs });
  }
  async delete(id: string) {
    await this.store.del(id);
  }
}

export const getStore = () => {
  const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;

  if (!KV_REST_API_TOKEN || !KV_REST_API_URL) {
    return;
  }

  const kv = createClient({
    url: KV_REST_API_URL,
    token: KV_REST_API_TOKEN,
  });

  return new Store(kv);
};
