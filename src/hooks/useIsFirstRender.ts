import { useRef } from "react";

/** Indicates whether current render is the first render. */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return false;
}
