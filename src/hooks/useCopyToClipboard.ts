import { useCallback, useState } from "react";

/** Copies text to clipboard and exposes copy state. */
export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) return false;
    await navigator.clipboard.writeText(text);
    setCopiedText(text);
    return true;
  }, []);
  return { copiedText, copy };
}
