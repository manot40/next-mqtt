type FuncParams = {
  topic?: string;
  message?: string;
  instance?: string;
} & { [key: string]: unknown };

const global = {};

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export const triggerFunc = (script: string, params = {} as FuncParams, cb?: (x: any) => void): void => {
  const result = new AsyncFunction('{ topic, message, instance, global, ...rest } = {}', script).call(null, {
    ...params,
    global,
  });

  cb?.(result);
};
