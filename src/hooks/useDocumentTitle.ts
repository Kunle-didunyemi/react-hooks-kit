import { useEffect } from "react";

/** Sets document title and optionally restores previous on unmount. */
export function useDocumentTitle(title: string, restoreOnUnmount = false): void {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      if (restoreOnUnmount) document.title = prev;
    };
  }, [title, restoreOnUnmount]);
}
