import { Dispatch, SetStateAction, useEffect, useState } from "react";

/** LocalStorage-backed React state with JSON serialization. */
export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const raw = window.localStorage.getItem(key);
    if (!raw) return initialValue;
    try { return JSON.parse(raw) as T; } catch { return initialValue; }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
