import { useEffect } from "react";

/** Calls callback when cursor leaves page from top boundary. */
export function usePageLeave(onLeave: () => void): void {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (event.clientY <= 0) onLeave();
    };
    document.addEventListener("mouseout", handler);
    return () => document.removeEventListener("mouseout", handler);
  }, [onLeave]);
}
