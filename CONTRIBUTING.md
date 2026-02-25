# Contributing to Platformicons

## Development Setup

```bash
git clone https://github.com/getsentry/platformicons.git
cd platformicons
yarn install
yarn build
```

Requirements: Node 20+ and Yarn 1.x (managed via [Volta](https://volta.sh/)).

## Adding a New Icon

1. **Add SVG files** to both directories:
   - `svg/<icon-name>.svg` — small version (solid background for readability at small sizes)
   - `svg_80x80/<icon-name>.svg` — large version (transparent background, 80x80px)

   Both directories must have matching filenames — the build will fail if they don't.

2. **Add the platform mapping** in `src/platformIcon.tsx` inside the `PLATFORM_TO_ICON` object. Keep entries in alphabetical order:

   ```ts
   export const PLATFORM_TO_ICON = {
     // ...
     "python-newframework": "newframework",
     // ...
   };
   ```

   The key is the platform identifier (e.g. `"python-newframework"`), and the value is the SVG filename without the extension (e.g. `"newframework"`).

3. **Regenerate the icon imports:**

   ```bash
   yarn generate
   ```

   This runs `scripts/generate-icons.js`, which reads both SVG directories and writes `src/icons.generated.ts`. Do not edit that file by hand.

4. **Verify the build:**

   ```bash
   yarn build
   ```

## Build Process

`yarn build` does three things:

1. Runs `scripts/generate-icons.js` to create static imports for all SVGs in `src/icons.generated.ts`
2. Compiles TypeScript to CommonJS (`build/`)
3. Compiles TypeScript to ESM (`esmbuild/`)

## Submitting Changes

1. Fork the repo and create a branch
2. Make your changes
3. Run `yarn build` to verify everything compiles
4. Open a pull request — do **not** bump the version in `package.json`, that's handled automatically during release
