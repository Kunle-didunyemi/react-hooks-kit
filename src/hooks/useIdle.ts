import { useEffect, useState } from "react";

/** Indicates whether user is idle for timeout period. */
export function useIdle(timeout = 30000): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let id: number;
    const reset = () => {
      setIdle(false);
      window.clearTimeout(id);
      id = window.setTimeout(() => setIdle(true), timeout);
    };
    ["mousemove", "keydown", "touchstart", "scroll"].forEach((e) => window.addEventListener(e, reset));
    reset();
    return () => {
      window.clearTimeout(id);
      ["mousemove", "keydown", "touchstart", "scroll"].forEach((e) => window.removeEventListener(e, reset));
    };
  }, [timeout]);
  return idle;
}
