import { useEffect, useRef } from "react";

/** Runs callback at random intervals between minDelay and maxDelay. */
export function useRandomInterval(callback: () => void, minDelay: number, maxDelay: number, enabled = true): void {
  const saved = useRef(callback);
  useEffect(() => { saved.current = callback; }, [callback]);

  useEffect(() => {
    if (!enabled) return;
    let id: number;
    const tick = () => {
      const next = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      id = window.setTimeout(() => {
        saved.current();
        tick();
      }, next);
    };
    tick();
    return () => window.clearTimeout(id);
  }, [enabled, minDelay, maxDelay]);
}
