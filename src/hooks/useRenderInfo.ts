import { useMemo } from "react";
import { useRenderCount } from "./useRenderCount";

/** Returns render diagnostic info for current component. */
export function useRenderInfo(componentName = "Component") {
  const renderCount = useRenderCount();
  return useMemo(() => ({ componentName, renderCount, renderedAt: Date.now() }), [componentName, renderCount]);
}
