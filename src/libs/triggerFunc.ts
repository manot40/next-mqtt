export type FuncParams = {
  topic?: string;
  message?: string;
  instance?: string;
} & { [key: string]: unknown };

const global = {};

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export const triggerFunc = <T = any>(script: string, params: FuncParams, cb?: (x: T) => void): void => {
  const ctx = { ...params };
  Object.freeze(ctx);

  const result: Promise<T> = new AsyncFunction('ctx, global', script).apply(null, [ctx, global]);

  result.then(cb).catch((e) => {
    alert(`Function runtime error:\n${e.message}`);
  });
};
