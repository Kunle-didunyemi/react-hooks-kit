import { useMemo } from "react";

/** Returns fallback when provided value is nullish. */
export function useDefault<T>(value: T | null | undefined, fallback: T): T {
  return useMemo(() => (value ?? fallback), [value, fallback]);
}
