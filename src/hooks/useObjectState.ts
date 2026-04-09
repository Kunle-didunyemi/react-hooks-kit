import { useCallback, useState } from "react";

/** Object state helper with partial merge updates. */
export function useObjectState<T extends Record<string, unknown>>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const setPartial = useCallback((patch: Partial<T>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);
  const reset = useCallback(() => setState(initialState), [initialState]);
  return { state, setState, setPartial, reset };
}
