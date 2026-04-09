import { useEffect } from "react";

/** Locks body scrolling while enabled. */
export function useLockBodyScroll(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [enabled]);
}
