import { useCallback, useState } from "react";

/** State with undo/redo history support. */
export function useHistoryState<T>(initialValue: T) {
  const [history, setHistory] = useState<T[]>([initialValue]);
  const [index, setIndex] = useState(0);
  const state = history[index];
  const set = useCallback((value: T) => {
    setHistory((prev) => [...prev.slice(0, index + 1), value]);
    setIndex((i) => i + 1);
  }, [index]);
  const undo = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const redo = useCallback(() => setIndex((i) => Math.min(history.length - 1, i + 1)), [history.length]);
  const reset = useCallback((value: T) => { setHistory([value]); setIndex(0); }, []);
  return { state, set, undo, redo, reset, canUndo: index > 0, canRedo: index < history.length - 1 };
}
