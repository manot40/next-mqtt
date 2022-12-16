import create from 'zustand';
import store from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { IDBStore } from './persistStore';

type MessageStore = {
  data: {
    [instance: string]: Message[] | undefined;
  };
  add: (id: string, message: Message) => void;
  remove: (id: string) => void;
};

export const message = store<MessageStore>()(
  persist(
    (set) => ({
      data: {},

      add(id, message) {
        set((state) => {
          const tmp = [...(state.data[id] || [])];
          // if (tmp.length == 100) tmp.pop();
          // if (tmp.some((m) => m.epoch == message.epoch)) return state;
          tmp.unshift(message);
          return { data: { ...state.data, [id]: tmp } };
        });
      },

      remove(id) {
        set((state) => {
          delete state.data[id];
          return { data: { ...state.data } };
        });
      },
    }),
    {
      name: 'messages',
      getStorage: () => IDBStore,
      partialize: (state) => ({ data: state.data }),
    }
  )
);

export default create(message);
