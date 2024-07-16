type DebounceType = (fn: () => void, delay: number) => void;

export const debounce: DebounceType = (fn, delay) => {
  let timerId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn();
    }, delay);
  };
};
