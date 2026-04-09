import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as hooks from "../src/index";

describe("exports", () => {
  it("exports all requested hooks", () => {
    const expected = [
      "useBattery",
      "useClickAway",
      "useContinuousRetry",
      "useCopyToClipboard",
      "useCountdown",
      "useCounter",
      "useDebounce",
      "useDefault",
      "useDocumentTitle",
      "useEventListener",
      "useFavicon",
      "useFetch",
      "useGeolocation",
      "useHistoryState",
      "useHover",
      "useIdle",
      "useIntersectionObserver",
      "useInterval",
      "useIntervalWhen",
      "useIsClient",
      "useIsFirstRender",
      "useKeyPress",
      "useList",
      "useLocalStorage",
      "useLockBodyScroll",
      "useLogger",
      "useLongPress",
      "useMap",
      "useMeasure",
      "useMediaQuery",
      "useMouse",
      "useNetworkState",
      "useObjectState",
      "useOrientation",
      "usePageLeave",
      "usePreferredLanguage",
      "usePrevious",
      "useQueue",
      "useRandomInterval",
      "useRenderCount",
      "useRenderInfo",
      "useScript",
      "useSessionStorage",
      "useSet",
      "useThrottle",
      "useTimeout",
      "useToggle",
      "useVisibilityChange",
      "useWindowScroll",
      "useWindowSize"
    ];
    for (const name of expected) {
      expect(hooks[name as keyof typeof hooks]).toBeTypeOf("function");
    }
  });
});

describe("core hook behavior", () => {
  it("useCounter increments/decrements and clamps", () => {
    const { result } = renderHook(() => hooks.useCounter(1, { min: 0, max: 2 }));
    act(() => result.current.increment());
    expect(result.current.count).toBe(2);
    act(() => result.current.increment());
    expect(result.current.count).toBe(2);
    act(() => result.current.decrement(2));
    expect(result.current.count).toBe(0);
  });

  it("useToggle toggles and sets explicitly", () => {
    const { result } = renderHook(() => hooks.useToggle(false));
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1](false));
    expect(result.current[0]).toBe(false);
  });

  it("useDebounce updates after delay", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => hooks.useDebounce(value, 100), {
      initialProps: { value: "a" }
    });
    rerender({ value: "b" });
    expect(result.current).toBe("a");
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("b");
    vi.useRealTimers();
  });

  it("useLocalStorage persists state", () => {
    const { result } = renderHook(() => hooks.useLocalStorage("test-key", "v1"));
    act(() => result.current[1]("v2"));
    expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify("v2"));
  });

  it("useSessionStorage persists state", () => {
    const { result } = renderHook(() => hooks.useSessionStorage("session-key", 1));
    act(() => result.current[1](2));
    expect(window.sessionStorage.getItem("session-key")).toBe(JSON.stringify(2));
  });

  it("useFetch loads JSON", async () => {
    const response = { ok: true, json: async () => ({ ok: true }) } as Response;
    vi.spyOn(global, "fetch").mockResolvedValue(response);
    const { result } = renderHook(() => hooks.useFetch<{ ok: boolean }>("/api/test"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ ok: true });
    });
    vi.restoreAllMocks();
  });

  it("useInterval calls callback while enabled", () => {
    vi.useFakeTimers();
    const cb = vi.fn();
    renderHook(() => hooks.useInterval(cb, 50));
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(cb).toHaveBeenCalledTimes(4);
    vi.useRealTimers();
  });

  it("useTimeout calls callback once", () => {
    vi.useFakeTimers();
    const cb = vi.fn();
    renderHook(() => hooks.useTimeout(cb, 50));
    act(() => vi.advanceTimersByTime(50));
    expect(cb).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("useDocumentTitle updates title", () => {
    renderHook(() => hooks.useDocumentTitle("My Title"));
    expect(document.title).toBe("My Title");
  });

  it("useWindowSize returns size object", () => {
    const { result } = renderHook(() => hooks.useWindowSize());
    expect(result.current.width).toBeTypeOf("number");
    expect(result.current.height).toBeTypeOf("number");
  });

  it("useContinuousRetry retries then resolves", async () => {
    const task = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce("ok");
    const { result } = renderHook(() => hooks.useContinuousRetry(task, { retryDelay: 5, retries: 2 }));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe("ok");
    });
  });

  it("useDefault returns fallback for nullish values", () => {
    const { result, rerender } = renderHook(({ v }) => hooks.useDefault(v, "fallback"), {
      initialProps: { v: null as string | null }
    });
    expect(result.current).toBe("fallback");
    rerender({ v: "value" });
    expect(result.current).toBe("value");
  });

  it("useIsFirstRender flips after rerender", () => {
    const { result, rerender } = renderHook(() => hooks.useIsFirstRender());
    expect(result.current).toBe(true);
    rerender();
    expect(result.current).toBe(false);
  });

  it("usePrevious exposes previous value", () => {
    const { result, rerender } = renderHook(({ n }) => hooks.usePrevious(n), { initialProps: { n: 1 } });
    expect(result.current).toBeUndefined();
    rerender({ n: 2 });
    expect(result.current).toBe(1);
  });

  it("useList supports push and removeAt", () => {
    const { result } = renderHook(() => hooks.useList<number>([1]));
    act(() => result.current.push(2));
    expect(result.current.list).toEqual([1, 2]);
    act(() => result.current.removeAt(0));
    expect(result.current.list).toEqual([2]);
  });

  it("useSet supports add/toggle", () => {
    const { result } = renderHook(() => hooks.useSet<number>());
    act(() => result.current[1].add(1));
    expect(result.current[0].has(1)).toBe(true);
    act(() => result.current[1].toggle(1));
    expect(result.current[0].has(1)).toBe(false);
  });

  it("useQueue supports enqueue/dequeue", () => {
    const { result } = renderHook(() => hooks.useQueue<number>());
    act(() => result.current.enqueue(7));
    expect(result.current.queue).toEqual([7]);
    act(() => result.current.dequeue());
    expect(result.current.queue).toEqual([]);
  });

  it("useObjectState merges partial updates", () => {
    const { result } = renderHook(() => hooks.useObjectState({ a: 1, b: 2 }));
    act(() => result.current.setPartial({ b: 3 }));
    expect(result.current.state).toEqual({ a: 1, b: 3 });
  });

  it("useHistoryState supports undo and redo", () => {
    const { result } = renderHook(() => hooks.useHistoryState(1));
    act(() => result.current.set(2));
    expect(result.current.state).toBe(2);
    act(() => result.current.undo());
    expect(result.current.state).toBe(1);
    act(() => result.current.redo());
    expect(result.current.state).toBe(2);
  });

  it("useCopyToClipboard writes to clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const { result } = renderHook(() => hooks.useCopyToClipboard());
    await act(async () => {
      await result.current.copy("hello");
    });
    expect(writeText).toHaveBeenCalledWith("hello");
    expect(result.current.copiedText).toBe("hello");
  });

  it("useEventListener listens to events", () => {
    const handler = vi.fn();
    renderHook(() => hooks.useEventListener("click", handler));
    window.dispatchEvent(new MouseEvent("click"));
    expect(handler).toHaveBeenCalled();
  });

  it("useClickAway invokes callback for outside clicks", () => {
    const ref = { current: document.createElement("div") };
    document.body.appendChild(ref.current);
    const onAway = vi.fn();
    renderHook(() => hooks.useClickAway(ref, onAway));
    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(onAway).toHaveBeenCalled();
  });

  it("useLockBodyScroll updates body overflow", () => {
    const prev = document.body.style.overflow;
    const { unmount } = renderHook(() => hooks.useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe(prev);
  });
});
