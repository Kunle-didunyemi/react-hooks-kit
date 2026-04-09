import { useEffect } from "react";

/** Updates page favicon href. */
export function useFavicon(href: string): void {
  useEffect(() => {
    const el = document.querySelector<HTMLLinkElement>('link[rel*="icon"]') ?? document.createElement("link");
    el.rel = "icon";
    el.href = href;
    document.head.appendChild(el);
  }, [href]);
}
