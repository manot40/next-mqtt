import create from 'zustand';
import store from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { IDBStore } from './persistStore';

type MessageStore = {
  data: {
    [topic: string]: Message[] | undefined;
  };
  add: (topic: string, message: Message) => void;
  remove: (topic: string) => void;
};

export const message = store<MessageStore>()(
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
      getStorage: () => IDBStore,
    }
  )
);

export default create(message);
