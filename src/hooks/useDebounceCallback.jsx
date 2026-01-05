import { useRef } from "react";

export function useDebounceCallback(callback, delay = 300) {
  const timer = useRef(null);

  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
