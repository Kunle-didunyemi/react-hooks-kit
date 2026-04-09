# Hooks API Index

Each hook is exported from the package root:

```ts
import { useToggle, useDebounce } from "kay-react-hooks-kit";
```

## Available Hooks

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

## Next step

Create one file per hook under `docs/hooks/` as your API grows, then add each page to the VitePress sidebar in `docs/.vitepress/config.ts`.
