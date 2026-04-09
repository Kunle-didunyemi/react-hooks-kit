import { useCallback, useState } from "react";

/** Queue data structure hook. */
export function useQueue<T>(initialValue: T[] = []) {
  const [queue, setQueue] = useState(initialValue);
  const enqueue = useCallback((value: T) => setQueue((q) => [...q, value]), []);
  const dequeue = useCallback(() => {
    let removed: T | undefined;
    setQueue((q) => {
      removed = q[0];
      return q.slice(1);
    });
    return removed;
  }, []);
  const clear = useCallback(() => setQueue([]), []);
  return { queue, enqueue, dequeue, clear, size: queue.length };
}
