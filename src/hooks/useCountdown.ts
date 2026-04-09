import { useCallback, useEffect, useState } from "react";

export interface UseCountdownOptions { from: number; to?: number; interval?: number; autoStart?: boolean; }

/** Counts down from a starting number to target. */
export function useCountdown({ from, to = 0, interval = 1000, autoStart = true }: UseCountdownOptions) {
  const [count, setCount] = useState(from);
  const [running, setRunning] = useState(autoStart);
  const reset = useCallback(() => setCount(from), [from]);
  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);

  useEffect(() => {
    if (!running || count <= to) return;
    const id = window.setTimeout(() => setCount((c) => c - 1), interval);
    return () => window.clearTimeout(id);
  }, [running, count, interval, to]);

  return { count, running, start, stop, reset, isComplete: count <= to };
}
