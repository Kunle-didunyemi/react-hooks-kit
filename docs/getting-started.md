# Getting Started

## Installation

```bash
npm install kay-react-hooks-kit
```

## Usage

```tsx
import { useCounter, useDebounce, useFetch } from "kay-react-hooks-kit";

export function Demo() {
  const { count, increment } = useCounter(0);
  const debouncedCount = useDebounce(count, 300);
  const { data, loading } = useFetch<{ ok: boolean }>("/api/health");

  return (
    <div>
      <p>count: {count}</p>
      <p>debounced: {debouncedCount}</p>
      <button onClick={() => increment()}>Increment</button>
      <pre>{loading ? "loading..." : JSON.stringify(data)}</pre>
    </div>
  );
}
```

## Development

```bash
npm install
npm run docs:dev
```

Useful commands:

- `npm run docs:dev` starts local docs server
- `npm run docs:build` builds static docs
- `npm run docs:preview` previews built docs
