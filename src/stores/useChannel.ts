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

type ChannelStore = {
  data: {
    [id: string]: Channel[] | undefined;
  };
  add: (id: string, channel: Channel) => void;
  update: (id: string, topic: string, channel: Channel) => void;
  remove: (id: string) => void;
};

const useChannel = create<ChannelStore>()(
  persist(
    (set) => ({
      data: {},
      add: (id, channel) => {
        set((state) => ({
          data: {
            ...state.data,
            [id]: [...(state.data[id] || []), channel],
          },
        }));
      },
      update: (id, topic, channel) => {
        set((state) => ({
          data: {
            ...state.data,
            [id]: state.data[id]!.map((c) => (c.topic === topic ? channel : c)),
          },
        }));
      },
      remove: (id) => {
        set((state) => {
          delete state.data[id];
          return { data: { ...state.data } };
        });
      },
    }),
    {
      name: 'channel',
      getStorage: () => storage,
    }
  )
);

export default useChannel;
