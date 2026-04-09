import { RefObject, useEffect } from "react";

/** Calls callback when pointer events occur outside provided ref. */
export function useClickAway<T extends HTMLElement>(ref: RefObject<T>, onClickAway: (event: MouseEvent | TouchEvent) => void): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      onClickAway(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, onClickAway]);
}
