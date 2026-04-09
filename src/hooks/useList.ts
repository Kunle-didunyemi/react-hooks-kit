import { useCallback, useState } from "react";

/** Array state helper utilities. */
export function useList<T>(initialValue: T[] = []) {
  const [list, setList] = useState<T[]>(initialValue);
  const push = useCallback((item: T) => setList((prev) => [...prev, item]), []);
  const removeAt = useCallback((index: number) => setList((prev) => prev.filter((_, i) => i !== index)), []);
  const clear = useCallback(() => setList([]), []);
  return { list, setList, push, removeAt, clear };
}
