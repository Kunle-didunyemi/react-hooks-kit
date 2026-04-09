import { useEffect, useState } from "react";

/** Tracks screen orientation type where supported. */
export function useOrientation(): string {
  const get = () => screen.orientation?.type ?? (window.innerWidth > window.innerHeight ? "landscape" : "portrait");
  const [orientation, setOrientation] = useState(get());
  useEffect(() => {
    const update = () => setOrientation(get());
    window.addEventListener("resize", update);
    screen.orientation?.addEventListener?.("change", update);
    return () => {
      window.removeEventListener("resize", update);
      screen.orientation?.removeEventListener?.("change", update);
    };
  }, []);
  return orientation;
}
