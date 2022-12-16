import mqtt from 'mqtt';

import { triggerFunc } from './triggerFunc';
import { channel, message, script } from 'stores';

type MqttClientWithUtils = mqtt.Client & {
  subChannels: (id?: string) => MqttClientWithUtils;
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

      // Execute all 'onconnect' scripts
      script
        .getState()
        .get(opts.clientId, { runOn: 'connected' })
        ?.forEach((data) => triggerFunc(data.script, {}));

      client.subChannels = function (id) {
        const clientId = id || this.options.clientId!;

        channel.getState().data[clientId]?.forEach((chan) => {
          this.subscribe(chan.topic, { qos: chan.qos as any });
        });

        this.on('message', (topic, msg) => {
          const _message = msg.toString();

          script
            .getState()
            .get(opts.clientId, { runOn: 'message', topic, message: _message })
            ?.forEach((data) => triggerFunc(data.script, { topic, message: _message }));

          message.getState().add(clientId, {
            topic,
            epoch: Date.now(),
            message: _message,
          });
        });

        this.once('end', () =>
          script
            .getState()
            .get(opts.clientId, { runOn: 'disconnected' })
            ?.forEach((data) => triggerFunc(data.script, {}))
        );

        return this;
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
