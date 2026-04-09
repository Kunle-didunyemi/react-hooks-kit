import { useEffect, useState } from "react";

export type ScriptStatus = "idle" | "loading" | "ready" | "error";

/** Dynamically loads external script and exposes load status. */
export function useScript(src: string | null): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(src ? "loading" : "idle");
  useEffect(() => {
    if (!src) return;
    let script = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
    const onLoad = () => setStatus("ready");
    const onError = () => setStatus("error");
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    return () => {
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
    };
  }, [src]);
  return status;
}
