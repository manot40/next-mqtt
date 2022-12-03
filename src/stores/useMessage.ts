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

type MessageStore = {
  data: {
    [topic: string]: Message[] | undefined;
  };
  add: (topic: string, message: Message) => void;
  remove: (topic: string) => void;
};

const useMessage = create<MessageStore>()(
  persist(
    (set) => ({
      data: {},
      add: (topic: string, message: Message) => {
        set((state) => ({
          data: {
            ...state.data,
            [topic]: [...(state.data[topic] || []), message],
          },
        }));
      },
      remove: (topic: string) => {
        set((state) => {
          delete state.data[topic];
          return { data: { ...state.data } };
        });
      },
    }),
    {
      name: 'messages',
      getStorage: () => storage,
    }
  )
);

export default useMessage;
