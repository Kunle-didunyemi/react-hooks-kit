import { useEffect, useRef } from "react";

/** Runs callback once after delay; pass null to disable. */
export function useTimeout(callback: () => void, delay: number | null): void {
  const saved = useRef(callback);
  useEffect(() => { saved.current = callback; }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = window.setTimeout(() => saved.current(), delay);
    return () => window.clearTimeout(id);
  }, [delay]);
}
