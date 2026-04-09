import { useCallback, useEffect, useState } from "react";

export interface UseFetchState<T> { data: T | null; error: Error | null; loading: boolean; }

/** Fetches JSON data and exposes loading/error states plus refetch. */
export function useFetch<T = unknown>(input: RequestInfo | URL, init?: RequestInit, immediate = true) {
  const [state, setState] = useState<UseFetchState<T>>({ data: null, error: null, loading: immediate });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(input, init);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      const data = (await response.json()) as T;
      setState({ data, error: null, loading: false });
      return data;
    } catch (error) {
      const normalized = error instanceof Error ? error : new Error("Unknown fetch error");
      setState({ data: null, error: normalized, loading: false });
      throw normalized;
    }
  }, [input, init]);

  useEffect(() => {
    if (!immediate) return;
    void execute();
  }, [execute, immediate]);

  return { ...state, refetch: execute };
}
