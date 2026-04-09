import { useMemo, useState } from "react";

/** Set state helper with immutable update operations. */
export function useSet<T>(initialValue?: Iterable<T>) {
  const [set, setSet] = useState(() => new Set<T>(initialValue));
  const actions = useMemo(() => ({
    add: (value: T) => setSet((prev) => new Set(prev).add(value)),
    remove: (value: T) => setSet((prev) => { const next = new Set(prev); next.delete(value); return next; }),
    toggle: (value: T) => setSet((prev) => { const next = new Set(prev); next.has(value) ? next.delete(value) : next.add(value); return next; }),
    clear: () => setSet(new Set<T>())
  }), []);
  return [set, actions] as const;
}
