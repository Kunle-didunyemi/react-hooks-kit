import { useCallback, useState } from "react";

export interface UseCounterOptions { min?: number; max?: number; }
export interface UseCounterReturn {
  count: number;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  set: (value: number) => void;
  reset: () => void;
}

/** Counter state with clamped updates and helpers. */
export function useCounter(initialValue = 0, options: UseCounterOptions = {}): UseCounterReturn {
  const { min = -Infinity, max = Infinity } = options;
  const clamp = useCallback((v: number) => Math.min(max, Math.max(min, v)), [min, max]);
  const [count, setCount] = useState(() => clamp(initialValue));
  const set = useCallback((value: number) => setCount(clamp(value)), [clamp]);
  const increment = useCallback((step = 1) => setCount((v) => clamp(v + step)), [clamp]);
  const decrement = useCallback((step = 1) => setCount((v) => clamp(v - step)), [clamp]);
  const reset = useCallback(() => setCount(clamp(initialValue)), [clamp, initialValue]);
  return { count, increment, decrement, set, reset };
}
