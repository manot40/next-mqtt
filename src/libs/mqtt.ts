import mqtt from 'mqtt';

import { channel, message } from 'stores';

type MqttClientWithUtils = mqtt.Client & {
  subChannels: (id?: string) => void;
};

export const connect = (opts: ClientOpts): Promise<MqttClientWithUtils> =>
  new Promise((res, rej) => {
    let finish = false;

    const mqttClient = mqtt.connect({
      protocol: opts.ssl ? 'wss' : 'ws',
      path: '/mqtt',
      ...opts,
    });

    mqttClient.once('connect', () => {
      const client = mqttClient as MqttClientWithUtils;

      client.subChannels = function (id) {
        const clientId = id || this.options.clientId!;

        channel.getState().data[clientId]?.forEach((chan) => {
          this.subscribe(chan.topic, { qos: chan.qos as any });
        });

        this.on('message', (topic, msg) => {
          message.getState().add(clientId, {
            topic,
            epoch: Date.now(),
            message: msg.toString(),
          });
        });
      };

      finish = true;
      res(client);
    });

    mqttClient.once('error', (e) => {
      finish = true;
      mqttClient.end();
      rej(e);
    });

    setTimeout(() => {
      if (!finish) {
        mqttClient.end(true);
        rej(new Error('Connection timed out'));
      }
    }, 10000);
  });
