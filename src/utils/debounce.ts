// @ts-ignore
export function debounce<T = any, P = any>(cb: (...args: P) => T, wait = 0) {
  let timeout: NodeJS.Timeout;
  // @ts-ignore
  return (...args: P) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // @ts-ignore
      cb.apply(null, args);
    }, wait);
  };
}
