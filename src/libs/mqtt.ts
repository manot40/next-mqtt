import mqtt from 'mqtt';

export const connect = (opts: ClientOpts): Promise<mqtt.Client> =>
  new Promise((res, rej) => {
    let finish = false;

    const mqttClient = mqtt.connect({
      protocol: opts.ssl ? 'wss' : 'ws',
      path: '/mqtt',
      ...opts,
    });

    mqttClient.once('connect', () => {
      finish = true;
      res(mqttClient);
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
