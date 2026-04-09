import { useEffect, useRef, useState } from "react";

/** Throttles value updates to at most once per interval. */
export function useThrottle<T>(value: T, interval = 300): T {
  const [throttled, setThrottled] = useState(value);
  const last = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - last.current);
    if (remaining <= 0) {
      last.current = now;
      setThrottled(value);
      return;
    }
    timeoutRef.current = window.setTimeout(() => {
      last.current = Date.now();
      setThrottled(value);
    }, remaining);
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, [value, interval]);

  return throttled;
}
