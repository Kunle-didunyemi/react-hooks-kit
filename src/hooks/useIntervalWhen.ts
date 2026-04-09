import { useInterval } from "./useInterval";

/** Conditionally runs interval callback when enabled. */
export function useIntervalWhen(callback: () => void, delay: number, enabled = true): void {
  useInterval(callback, enabled ? delay : null);
}
