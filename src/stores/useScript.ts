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
type ScriptKind = Pick<ScriptDefinition, 'message' | 'runOn' | 'topic'>;
type ScriptHistory = ScriptKind & { time: number; name: string };

type ScriptStore = {
  data: {
    [instance: string]: ScriptDefinition[] | undefined;
  };
  history: {
    [instance: string]: ScriptHistory[] | undefined;
  };

  // Data mutator
  get: (instance: string, search: ScriptKind) => ScriptDefinition[] | undefined;
  add: (instance: string, func: ScriptDefinition) => void;
  update: (instance: string, id: string, func: ScriptDefinition) => void;
  remove: (instance: string, id?: string) => void;

  // History mutator
  addHistory: (instance: string, func: ScriptHistory) => void;
};

export const script = store<ScriptStore>()(
  persist(
    (set, get) => ({
      data: {},
      history: {},

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
            [instance]: [func, ...(state.data[instance] || [])],
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

      addHistory(instance, func) {
        set((state) => ({
          history: {
            ...state.history,
            [instance]: [func, ...(state.history[instance] || [])],
          },
        }));
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
