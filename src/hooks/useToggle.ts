import { useCallback, useState } from "react";

/** Boolean toggle helper with optional explicit value. */
export function useToggle(initialValue = false): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback((next?: boolean) => setValue((v) => (typeof next === "boolean" ? next : !v)), []);
  return [value, toggle];
}
