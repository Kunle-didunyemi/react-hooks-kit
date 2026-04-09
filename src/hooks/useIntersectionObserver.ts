import { RefObject, useEffect, useState } from "react";

/** Observes intersection status of a target element. */
export function useIntersectionObserver<T extends Element>(ref: RefObject<T>, options?: IntersectionObserverInit) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([first]) => setEntry(first), options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options]);
  return entry;
}
