import { useRef } from "react";

/** Counts how many times a component has rendered. */
export function useRenderCount(): number {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}
