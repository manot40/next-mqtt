import create from 'zustand';
import store from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { IDBStore } from './persistStore';

type ChannelStore = {
  data: {
    [id: string]: Channel[] | undefined;
  };
  add: (id: string, channel: Channel) => void;
  update: (id: string, topic: string, channel: Channel) => void;
  remove: (id: string) => void;
};

export const channel = store<ChannelStore>()(
  persist(
    (set) => ({
      data: {},

      add(id, channel) {
        set((state) => ({
          data: {
            ...state.data,
            [id]: [...(state.data[id] || []), channel],
          },
        }));
      },

      update(id, topic, channel) {
        set((state) => ({
          data: {
            ...state.data,
            [id]: state.data[id]!.map((c) => (c.topic === topic ? channel : c)),
          },
        }));
      },

      remove(id) {
        set((state) => {
          delete state.data[id];
          return { data: { ...state.data } };
        });
      },
    }),
    {
      name: 'channel',
      getStorage: () => IDBStore,
      partialize: (state) => ({ data: state.data }),
    }
  )
);

export default create(channel);
