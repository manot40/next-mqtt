import create from 'zustand';
import store from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { matchTopic } from 'utils';
import { IDBStore } from './persistStore';

export type ScriptDefinition = {
  id: string;
  name: string;
  runOn: 'connected' | 'disconnected' | 'message';
  script: string;
  template: string;
  topic?: string;
  message?: string;
};

type SearchCriteria = Pick<ScriptDefinition, 'message' | 'runOn' | 'topic'>;

type ScriptStore = {
  data: {
    [instance: string]: ScriptDefinition[] | undefined;
  };
  get: (instance: string, search: SearchCriteria) => ScriptDefinition[] | undefined;
  add: (instance: string, func: ScriptDefinition) => void;
  update: (instance: string, id: string, func: ScriptDefinition) => void;
  remove: (instance: string, id?: string) => void;
};

export const script = store<ScriptStore>()(
  persist(
    (set, get) => ({
      data: {},

      get(instance, criteria) {
        return get().data[instance]?.filter((f) => {
          if (criteria.runOn === 'message' && f.runOn === 'message') {
            if (f.topic && criteria.topic) return matchTopic(f.topic, criteria.topic);
            if (f.message && criteria.message) return f.message.includes(criteria.message);
            return true;
          } else return criteria.runOn === f.runOn;
        });
      },

      add(instance, func) {
        set((state) => ({
          data: {
            ...state.data,
            [instance]: [...(state.data[instance] || []), func],
          },
        }));
      },

      update(instance, id, func) {
        set((state) => ({
          data: {
            ...state.data,
            [instance]: state.data[instance]!.map((f) => (f.id === id ? func : f)),
          },
        }));
      },

      remove(instance, id) {
        set((state) => {
          if (!id) delete state.data[instance];
          else state.data[instance] = state.data[instance]!.filter((f) => f.id !== id);
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
