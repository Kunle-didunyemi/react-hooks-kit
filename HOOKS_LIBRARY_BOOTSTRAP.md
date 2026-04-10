
## 1) Create project

```bash
mkdir my-hooks-lib
cd my-hooks-lib
npm init -y
```

## 2) Install dependencies

```bash
npm i -D typescript tsup vitest jsdom @testing-library/react @types/react @types/react-dom @types/node
npm i -D react react-dom
```

## 3) Create folders/files

```bash
mkdir -p src/hooks tests
touch src/index.ts tsconfig.json tsup.config.ts vitest.config.ts tests/setup.ts tests/hooks.test.tsx
```

## 4) package.json template

Replace your `package.json` with:

```json
{
  "name": "@your-scope/react-hooks-kit",
  "version": "0.1.0",
  "description": "Reusable React hooks with TypeScript support.",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist", "README.md", "LICENSE"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "prepublishOnly": "npm run typecheck && npm run test && npm run build"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.3.0",
    "@types/node": "^25.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "jsdom": "^25.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0",
    "vitest": "^3.0.0"
  }
}
```

## 5) tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["vitest/globals", "node"]
  },
  "include": ["src", "tests", "vitest.config.ts", "tsup.config.ts"]
}
```

## 6) tsup.config.ts

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2020",
  outDir: "dist"
});
```

## 7) vitest.config.ts

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"]
  }
});
```

## 8) First hook + export

Create `src/hooks/useToggle.ts`:

```ts
import { useCallback, useState } from "react";

/** Boolean toggle helper with optional explicit value. */
export function useToggle(initialValue = false): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback((next?: boolean) => {
    setValue((v) => (typeof next === "boolean" ? next : !v));
  }, []);
  return [value, toggle];
}
```

Create `src/index.ts`:

```ts
export * from "./hooks/useToggle";
```

## 9) Minimal test

Create `tests/hooks.test.tsx`:

```tsx
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToggle } from "../src";

describe("useToggle", () => {
  it("toggles and sets explicit value", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1](false));
    expect(result.current[0]).toBe(false);
  });
});
```

Create `tests/setup.ts`:

```ts
// Add global test setup here as needed.
```

## 10) Verify locally

```bash
npm run typecheck
npm run test
npm run build
```

## 11) Publish to npm

```bash
npm login
npm publish --access public
```

If name is taken, use a scoped name in `package.json`:

- `@yourname/react-hooks-kit`

Then publish again:

```bash
npm publish --access public
```

---

## Ongoing workflow

- Add each new hook in `src/hooks/`
- Export it in `src/index.ts`
- Add tests for behavior + edge cases
- Run: `npm run typecheck && npm run test && npm run build`
- Release with semantic versioning:
  - patch = bugfix
  - minor = new backward-compatible hook/feature
  - major = breaking API change
