import { useCallback, useRef } from "react";

/** Returns long-press event handlers for pointer interactions. */
export function useLongPress(callback: () => void, ms = 400) {
  const id = useRef<number | null>(null);
  const start = useCallback(() => {
    id.current = window.setTimeout(callback, ms);
  }, [callback, ms]);
  const clear = useCallback(() => {
    if (id.current !== null) window.clearTimeout(id.current);
  }, []);
  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear
  };
}
