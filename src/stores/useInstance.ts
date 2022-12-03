import create from 'zustand';
import { persist, type StateStorage } from 'zustand/middleware';

import { get, set, del } from 'idb-keyval';

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

type InstancesStore = {
  data: Instance[];
  create: (name?: string, client?: Instance['clientOpts']) => void;
  update: (name: string, instance: Instance) => void;
  remove: (name: string) => void;
  search: (id: string, cb: (index: number, instance: Instance) => void) => any;
};

const useInstance = create<InstancesStore>()(
  persist(
    (set, get) => ({
      data: [],
      create: (name: string = '', options: any) =>
        set({
          data: [
            ...get().data,
            {
              name,
              clientOpts: {
                ssl: true,
                port: 8884,
                hostname: '',
                username: '',
                password: '',
                keepalive: 60,
                ...options,
              },
            },
          ],
        }),
      update: (id: string, instance: Instance) => {
        const instances = get().data;
        get().search(id, (i) => {
          instances[i] = instance;
          set({ data: [...instances] });
        });
      },
      remove: (id: string) => {
        const instances = get().data;
        get().search(id, (i) => {
          instances.splice(i, 1);
          set({ data: [...instances] });
        });
      },
      search: (id, cb) => {
        const instances = get().data;
        const index = instances.findIndex((instance) => instance.clientOpts.clientId === id);
        if (index == -1) throw new Error('Instance not found');
        return cb(index, instances[index]);
      },
    }),
    {
      name: 'instances',
      getStorage: () => storage,
      partialize: (state) => ({ data: state.data }),
    }
  )
);

export default useInstance;
