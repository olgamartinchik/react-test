type DebounceType = (fn: (...args: any[]) => void, delay: number) => void;

export const debounce: DebounceType = (fn, delay) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
