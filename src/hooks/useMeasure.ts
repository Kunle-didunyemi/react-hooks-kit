import { RefObject, useEffect, useState } from "react";

export interface Bounds { x: number; y: number; width: number; height: number; top: number; left: number; right: number; bottom: number; }

/** Measures an element's bounding box using ResizeObserver. */
export function useMeasure<T extends Element>(ref: RefObject<T>): Bounds | null {
  const [bounds, setBounds] = useState<Bounds | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ x: rect.x, y: rect.y, width: rect.width, height: rect.height, top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return bounds;
}
