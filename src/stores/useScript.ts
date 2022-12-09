import create from 'zustand';
import store from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { IDBStore } from './persistStore';

export type ScriptDefinition = {
  id: string;
  name: string;
  when: 'connected' | 'disconnected' | 'message';
  script: string;
  template: string;
  topic?: string;
  message?: string;
};

type ScriptStore = {
  data: {
    [instance: string]: ScriptDefinition[] | undefined;
  };
  add: (instance: string, func: ScriptDefinition) => void;
  update: (instance: string, id: string, func: ScriptDefinition) => void;
  remove: (instance: string, id?: string) => void;
};

export const script = store<ScriptStore>()(
  persist(
    (set) => ({
      data: {},
      add: (instance, func) => {
        set((state) => ({
          data: {
            ...state.data,
            [instance]: [...(state.data[instance] || []), func],
          },
        }));
      },
      update: (instance, id, func) => {
        set((state) => ({
          data: {
            ...state.data,
            [instance]: state.data[instance]!.map((f) => (f.name === id ? func : f)),
          },
        }));
      },
      remove: (instance, id) => {
        set((state) => {
          if (!id) delete state.data[instance];
          else state.data[instance] = state.data[instance]!.filter((f) => f.name !== id);
          return { data: { ...state.data } };
        });
      },
    }),
    {
      name: 'script',
      getStorage: () => IDBStore,
      partialize: (state) => ({ data: state.data }),
    }
  )
);

export default create(script);
