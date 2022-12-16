import create from 'zustand';
import store from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { IDBStore } from './persistStore';

type InstancesStore = {
  data: Instance[];
  create: (id?: string, client?: Instance['clientOpts']) => void;
  update: (id: string, instance: Instance) => void;
  remove: (id: string) => void;
  search: (id: string, cb: (index: number, instance: Instance) => void) => any;
};

export const instance = store<InstancesStore>()(
  persist(
    (set, get) => ({
      data: [],

      create(id = '', options: any) {
        set({
          data: [
            ...get().data,
            {
              name: id,
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
        });
      },

      update(id, instance) {
        const instances = get().data;
        get().search(id, (i) => {
          instances[i] = instance;
          set({ data: [...instances] });
        });
      },

      remove(id) {
        const instances = get().data;
        get().search(id, (i) => {
          instances.splice(i, 1);
          set({ data: [...instances] });
        });
      },

      search(id, cb) {
        const instances = get().data;
        const index = instances.findIndex((instance) => instance.clientOpts.clientId === id);
        if (index == -1) throw new Error('Instance not found');
        return cb(index, instances[index]);
      },
    }),
    {
      name: 'instances',
      getStorage: () => IDBStore,
      partialize: (state) => ({ data: state.data }),
    }
  )
);

export default create(instance);
