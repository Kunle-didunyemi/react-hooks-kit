import { useEffect, useState } from "react";

/** Returns true when running on the client after mount. */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}
