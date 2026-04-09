import { RefObject, useEffect, useRef } from "react";

type Target = Window | Document | HTMLElement | EventTarget;
type MaybeRefTarget = RefObject<Target | null> | Target | null | undefined;

/** Adds an event listener with automatic cleanup and stable callback ref. */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: MaybeRefTarget,
  options?: AddEventListenerOptions
): void {
  const saved = useRef(handler);
  useEffect(() => { saved.current = handler; }, [handler]);
  useEffect(() => {
    const target = (element && typeof element === "object" && "current" in element
      ? element.current
      : (element ?? window)) as Target | null;
    if (!target || typeof (target as EventTarget).addEventListener !== "function") return;
    const listener = (event: Event) => saved.current(event as WindowEventMap[K]);
    target.addEventListener(eventName, listener, options);
    return () => target.removeEventListener(eventName, listener, options);
  }, [eventName, element, options]);
}
