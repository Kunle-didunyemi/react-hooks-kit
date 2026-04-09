import { useEffect, useState } from "react";

/** Tracks document visibility state. */
export function useVisibilityChange(): DocumentVisibilityState {
  const [state, setState] = useState<DocumentVisibilityState>(document.visibilityState);
  useEffect(() => {
    const onChange = () => setState(document.visibilityState);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return state;
}
