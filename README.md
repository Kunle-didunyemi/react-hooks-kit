# react-hooks-kit

Reusable React hooks library with TypeScript, dual ESM/CJS output, and Vitest test coverage.

## Why this structure

- Single package architecture keeps publishing and versioning simple while the API is still evolving.
- Move to a monorepo when you need separate packages (for example `@scope/core`, `@scope/browser`, `@scope/async`) with independent release cadence.
- `src/hooks/*` keeps each hook isolated and easy to maintain.
- `src/index.ts` is a single public API barrel to control exports.

## Install

```bash
npm install kay-react-hooks-kit
```

Peer dependencies:

- `react >= 18`
- `react-dom >= 18`

## Usage

```tsx
import { useCounter, useDebounce, useLocalStorage, useFetch } from "kay-react-hooks-kit";

function Example() {
  const { count, increment } = useCounter(0);
  const debouncedCount = useDebounce(count, 300);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const { data, loading } = useFetch<{ ok: boolean }>("/api/health");

  return (
    <div>
      <p>Count: {count}</p>
      <p>Debounced count: {debouncedCount}</p>
      <p>Theme: {theme}</p>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle theme</button>
      <p>{loading ? "Loading..." : JSON.stringify(data)}</p>
    </div>
  );
}
```

## Available hooks

- `useBattery`
- `useClickAway`
- `useContinuousRetry`
- `useCopyToClipboard`
- `useCountdown`
- `useCounter`
- `useDebounce`
- `useDefault`
- `useDocumentTitle`
- `useEventListener`
- `useFavicon`
- `useFetch`
- `useGeolocation`
- `useHistoryState`
- `useHover`
- `useIdle`
- `useIntersectionObserver`
- `useInterval`
- `useIntervalWhen`
- `useIsClient`
- `useIsFirstRender`
- `useKeyPress`
- `useList`
- `useLocalStorage`
- `useLockBodyScroll`
- `useLogger`
- `useLongPress`
- `useMap`
- `useMeasure`
- `useMediaQuery`
- `useMouse`
- `useNetworkState`
- `useObjectState`
- `useOrientation`
- `usePageLeave`
- `usePreferredLanguage`
- `usePrevious`
- `useQueue`
- `useRandomInterval`
- `useRenderCount`
- `useRenderInfo`
- `useScript`
- `useSessionStorage`
- `useSet`
- `useThrottle`
- `useTimeout`
- `useToggle`
- `useVisibilityChange`
- `useWindowScroll`
- `useWindowSize`

## Development

```bash
npm install
npm run test
npm run build
npm run docs:dev
```

Build output:

- `dist/index.js` (ESM)
- `dist/index.cjs` (CJS)
- `dist/index.d.ts` (Type declarations)

## Documentation site

- Local dev: `npm run docs:dev`
- Production build: `npm run docs:build`
- Preview production build: `npm run docs:preview`

Docs source lives in `docs/` and is configured in `docs/.vitepress/config.ts`.

## Publishing

Manual:

```bash
npm run release:patch
```

Or choose:

- `npm run release:minor`
- `npm run release:major`

These run `npm version` + `npm publish`.

## What to customize

- Tune individual hook behavior as needed (for example retries/backoff strategy in `useContinuousRetry`, response parsing in `useFetch`).
- Add additional API docs/examples per hook if you want documentation site style output.
