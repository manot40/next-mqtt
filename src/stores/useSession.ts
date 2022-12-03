import create from 'zustand';

type MqttClient = import('mqtt').Client;

type ActiveClients = {
  data: {
    [key: string]: MqttClient | undefined;
  };
  add: (name: string, client: MqttClient) => void;
  remove: (name: string) => void;
};

const useSession = create<ActiveClients>((set) => ({
  data: {},
  add: (name: string, client: MqttClient) => {
    set((state) => ({
      data: { ...state.data, [name]: client },
    }));
  },
  remove: (name: string) => {
    set((state) => {
      delete state.data[name];
      return { data: { ...state.data } };
    });
  },
}));

export default useSession;
