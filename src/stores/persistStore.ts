import type { StateStorage } from 'zustand/middleware';

import { get, set, del } from 'idb-keyval';

export const IDBStore: StateStorage = {
  async getItem(name): Promise<string | null> {
    return (await get(name)) || null;
  },
  async setItem(name, value): Promise<void> {
    await set(name, value);
  },
  async removeItem(name): Promise<void> {
    await del(name);
  },
};
