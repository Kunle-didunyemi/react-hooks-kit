import { useEffect, useState } from "react";

/** Tracks mouse position in viewport coordinates. */
export function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return position;
}
