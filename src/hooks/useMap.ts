import { useMemo, useState } from "react";

/** Map state helper with immutable update operations. */
export function useMap<K, V>(initialValue?: Iterable<readonly [K, V]>) {
  const [map, setMap] = useState(() => new Map<K, V>(initialValue));
  const actions = useMemo(() => ({
    set: (key: K, value: V) => setMap((prev) => new Map(prev).set(key, value)),
    remove: (key: K) => setMap((prev) => { const next = new Map(prev); next.delete(key); return next; }),
    clear: () => setMap(new Map<K, V>())
  }), []);
  return [map, actions] as const;
}
