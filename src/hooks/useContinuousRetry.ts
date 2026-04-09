import { useEffect, useRef, useState } from "react";

export interface UseContinuousRetryOptions { retries?: number; retryDelay?: number; enabled?: boolean; }

/** Retries an async task until success or retry budget exhausted. */
export function useContinuousRetry<T>(task: () => Promise<T>, options: UseContinuousRetryOptions = {}) {
  const { retries = 3, retryDelay = 1000, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(enabled);
  const cancelled = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    cancelled.current = false;
    let attempts = 0;
    const run = async () => {
      setLoading(true);
      while (attempts <= retries && !cancelled.current) {
        try {
          const value = await task();
          if (!cancelled.current) {
            setData(value);
            setError(null);
            setLoading(false);
          }
          return;
        } catch (e) {
          attempts += 1;
          if (attempts > retries) {
            if (!cancelled.current) {
              setError(e instanceof Error ? e : new Error("Task failed"));
              setLoading(false);
            }
            return;
          }
          await new Promise((resolve) => window.setTimeout(resolve, retryDelay));
        }
      }
    };
    void run();
    return () => {
      cancelled.current = true;
    };
  }, [enabled, retries, retryDelay, task]);

  return { data, error, loading };
}
