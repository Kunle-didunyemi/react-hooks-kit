import { useEffect } from "react";

/** Logs value changes to console for debugging. */
export function useLogger<T>(value: T, label = "useLogger"): void {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`[${label}]`, value);
  }, [label, value]);
}
