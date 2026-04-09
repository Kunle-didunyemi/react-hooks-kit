import { useEffect, useState } from "react";

/** Tracks browser preferred language. */
export function usePreferredLanguage(): string {
  const [lang, setLang] = useState(navigator.language);
  useEffect(() => {
    const update = () => setLang(navigator.language);
    window.addEventListener("languagechange", update);
    return () => window.removeEventListener("languagechange", update);
  }, []);
  return lang;
}
