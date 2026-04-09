import { useEffect, useState } from "react";

/** Tracks current window scroll coordinates. */
export function useWindowScroll() {
  const [state, setState] = useState({ x: window.scrollX, y: window.scrollY });
  useEffect(() => {
    const onScroll = () => setState({ x: window.scrollX, y: window.scrollY });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
}
