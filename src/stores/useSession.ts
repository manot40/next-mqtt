import create from 'zustand';
import store from 'zustand/vanilla';

type MqttClient = import('mqtt').Client;

type ActiveClients = {
  data: {
    [key: string]: MqttClient | undefined;
  };
  add: (name: string, client: MqttClient) => void;
  remove: (name: string) => void;
};

export const session = store<ActiveClients>((set) => ({
  data: {},

  add(name: string, client: MqttClient) {
    set((state) => ({
      data: { ...state.data, [name]: client },
    }));
  },

  remove(name: string) {
    set((state) => {
      delete state.data[name];
      return { data: { ...state.data } };
    });
  },
}));

export default create(session);
