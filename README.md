# Platformicons

A set of platform and framework icons from the people behind https://sentry.io.

## Installation

```bash
# yarn
yarn add platformicons

# npm
npm install platformicons
```

React is a peer dependency, so make sure it’s installed in your project.

The package ships both CommonJS and ESM builds:

- `"main"` → `build/index.js` (CommonJS — works with webpack, Gatsby, etc.)
- `"module"` → `esmbuild/index.js` (ESM — works with Vite, Astro, etc.)

Most bundlers pick the right entry automatically. Static SVG imports ensure both module systems resolve icons correctly.

## Usage

```tsx
import { PlatformIcon } from ‘platformicons’;

function App() {
  return <PlatformIcon platform="javascript-react" size={32} />;
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `platform` | `string` | — | Platform identifier (e.g. `"python-django"`, `"javascript-react"`) |
| `size` | `string \| number` | `20` | Icon width and height in pixels |
| `format` | `"sm" \| "lg"` | `"sm"` | `"sm"` uses compact icons from `/svg`, `"lg"` uses detailed icons from `/svg_80x80` |
| `radius` | `number \| null` | `3` | Border radius in pixels |
| `withLanguageIcon` | `boolean` | `false` | Show a small language badge in the bottom-right corner (e.g. the Python logo on a Django icon) |
| `languageIconStyles` | `React.CSSProperties` | `{}` | Custom styles for the language badge |

### Platform Names

Platforms use a `language-framework` naming convention:

```
python-django
javascript-react
ruby-rails
go-echo
```

Both dashes and dots are accepted (`python-django` and `python.django` are equivalent). If an exact match isn’t found, the library falls back to the language icon (the part before the first dash), then to a generic default icon.

`node-*` is an alias for `javascript-*` for backwards compatibility.

You can get the full list of supported platform keys at runtime:

```tsx
import { platforms } from ‘platformicons’;
// platforms is a string[] of all valid platform keys
```

### Preloading

To avoid render jank when icons appear on a new page, you can preload them:

```tsx
import { preloadIcons } from ‘platformicons’;

// Preload all icons (both sizes)
preloadIcons();

// Preload only small or large icons
preloadIcons(‘sm’);
preloadIcons(‘lg’);
```

This inserts `<link rel="preload">` tags into the document head.

## Using SVGs Directly

If you aren’t using React, the raw SVG files are included in the package:

- `platformicons/svg/` — small icons (solid backgrounds, optimized for small sizes)
- `platformicons/svg_80x80/` — large icons (transparent backgrounds, 80x80px)

## Publishing Changes

Platformicons uses GitHub Actions to publish changes. You don’t need to update the version in `package.json` since that’s done automatically.

1. Make a change but don’t update the version in package.json
2. Merge with Master
3. Head to the [Release workflow](https://github.com/getsentry/platformicons/actions/workflows/release.yml) and then run the workflow
4. This will create an issue in [getsentry/publish](https://github.com/getsentry/publish/issues)
5. Add the accepted label to publish

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and how to add new icons.
