import { RefObject, useEffect, useState } from "react";

/** Tracks whether the referenced element is hovered. */
export function useHover<T extends HTMLElement>(ref: RefObject<T>): boolean {
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
  return hovered;
}
