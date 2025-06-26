# Platformicons

A high-performance, lazy-loading set of platform and framework icons from the people behind [Sentry](https://sentry.io).

## ✨ Features

- 🚀 **Lazy Loading** - Icons load only when needed with dynamic imports
- 📦 **Tiny Bundle Size** - Only used icons are included in your bundle
- ⚡ **Performance Optimized** - React.memo, intersection observer, and smart caching
- 🎯 **Smart Preloading** - Priority-based loading with usage analytics
- 🔧 **TypeScript Ready** - Full type safety with autocomplete
- 🎨 **Customizable** - Multiple rendering modes and styling options
- 🛠️ **Developer Tools** - Built-in debugging and bundle analysis

## 📦 Installation

```bash
npm install platformicons
# or
yarn add platformicons
```

## 🚀 Quick Start

```tsx
import { PlatformIcon } from 'platformicons';

function MyApp() {
  return (
    <div>
      {/* Basic usage */}
      <PlatformIcon platform="javascript" size={32} />
      
      {/* With language icon overlay */}
      <PlatformIcon platform="javascript-react" withLanguageIcon />
      
      {/* Lazy loading with intersection observer */}
      <PlatformIcon platform="python" lazy />
    </div>
  );
}
```

## 📚 Components

### `PlatformIcon` (Recommended)
The main component with lazy loading and caching capabilities.

```tsx
<PlatformIcon 
  platform="javascript-react"
  size={24}
  format="sm"
  radius={3}
  withLanguageIcon
  lazy
  rootMargin="50px"
/>
```

### `InlinePlatformIcon`
Renders SVG content inline for better customization and styling.

```tsx
<InlinePlatformIcon 
  platform="python" 
  size={32}
  style={{ color: 'blue' }}
  className="my-icon"
/>
```

## ⚡ Performance Optimization

### Preloading
Improve perceived performance by preloading commonly used icons:

```tsx
import { preloadCommonIcons, preloadPlatformIcons, useSmartPreload } from 'platformicons';

// Preload essential icons on app start
preloadCommonIcons();

// Preload specific platforms
preloadPlatformIcons(['javascript', 'python', 'react']);

// Smart preloading based on current page (React Hook)
function MyComponent({ currentPlatforms }) {
  useSmartPreload(currentPlatforms);
  // ...
}

// Analytics-driven preloading
preloadByUsage(analyticsData, 0.1); // Load icons used by >10% of users
```

### Lazy Loading
Enable intersection observer-based lazy loading for better performance:

```tsx
// Load when icon enters viewport
<PlatformIcon platform="go" lazy />

// Custom intersection observer margin
<PlatformIcon platform="rust" lazy rootMargin="100px" />
```

## 🛠️ Development Tools

### Debug Overlay
Visual debugging in development mode:

```tsx
import { IconDebugOverlay } from 'platformicons';

function App() {
  return (
    <>
      <YourApp />
      <IconDebugOverlay enabled={process.env.NODE_ENV === 'development'} />
    </>
  );
}
```

### Bundle Analysis
Analyze icon usage and optimize bundle size:

```tsx
import { iconDebugger, useIconPerformance } from 'platformicons';

// Log detailed usage report
iconDebugger.logReport();

// React hook for performance metrics
function PerformanceMonitor() {
  const { totalIcons, loadedIcons, averageLoadTime } = useIconPerformance();
  return <div>Loaded {loadedIcons}/{totalIcons} icons</div>;
}
```

### Platform Validation
Validate platform names during development:

```tsx
import { validatePlatform } from 'platformicons';

const isValid = validatePlatform('javascript-react'); // true
const isInvalid = validatePlatform('nonexistent'); // false (with console warning)
```

## 🎨 Customization

### Props Reference

#### `PlatformIcon`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `platform` | `string` | **required** | Platform identifier (e.g., 'javascript', 'python-django') |
| `size` | `string \| number` | `20` | Icon size in pixels |
| `format` | `'sm' \| 'lg'` | `'sm'` | Icon format (sm: 20x20, lg: 80x80) |
| `radius` | `number \| null` | `3` | Border radius in pixels |
| `withLanguageIcon` | `boolean` | `false` | Show language icon overlay |
| `languageIconStyles` | `CSSProperties` | `{}` | Styles for language icon |
| `lazy` | `boolean` | `false` | Enable intersection observer lazy loading |
| `rootMargin` | `string` | `'50px'` | Intersection observer root margin |

#### `InlinePlatformIcon`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `platform` | `string` | **required** | Platform identifier |
| `size` | `string \| number` | `20` | Icon size in pixels |
| `format` | `'sm' \| 'lg'` | `'sm'` | Icon format |
| All SVG props | `SVGProps<SVGSVGElement>` | - | Standard SVG attributes |

## 📋 Available Platforms

### Languages
`javascript`, `typescript`, `python`, `java`, `go`, `rust`, `php`, `ruby`, `csharp`, `swift`, `kotlin`, `dart`, `elixir`, `clojure`, `scala`, `cpp`, `crystal`

### Frameworks & Libraries
`react`, `vue`, `angular`, `svelte`, `nextjs`, `nuxt`, `gatsby`, `astro`, `solid`, `lit`, `ember`, `backbone`

### Backend Frameworks
`express`, `fastify`, `nestjs`, `koa`, `hapi`, `django`, `flask`, `fastapi`, `rails`, `sinatra`, `spring`, `laravel`, `symfony`

### Platforms & Services
`nodejs`, `deno`, `bun`, `electron`, `tauri`, `cordova`, `capacitor`, `ionic`, `flutter`, `react-native`

### Databases & Tools
`mongodb`, `postgresql`, `redis`, `graphql`, `docker`, `kubernetes`, `aws`, `gcp`, `azure`, `supabase`

<details>
<summary>View all 200+ supported platforms</summary>

```typescript
import { platforms } from 'platformicons';
console.log(platforms); // Array of all platform names
```

</details>

## 🏗️ SVG Versions

There are two kinds of icons in this collection:

- **`/svg`** (20x20) - For smaller rendering sizes with solid backgrounds for high contrast
- **`/svg_80x80`** (80x80) - For larger rendering sizes with transparent backgrounds

## 📊 Bundle Analysis

The library is optimized for minimal bundle impact:

- **Tree-shakeable** - Only imported icons are bundled
- **Dynamic imports** - Icons load on-demand
- **Format selection** - Choose between sm/lg versions
- **~1.2KB average** per icon (gzipped)

Example bundle sizes:
- Using 5 icons: ~6KB
- Using 20 icons: ~24KB  
- Full library (200+ icons): ~240KB (but only with static imports)

## 🔧 TypeScript Support

Full TypeScript support with autocomplete for platform names:

```tsx
import { PlatformIcon } from 'platformicons';
import type { PLATFORM_TO_ICON } from 'platformicons';

type PlatformName = keyof typeof PLATFORM_TO_ICON;

// TypeScript will autocomplete and validate platform names
const platform: PlatformName = 'javascript-react'; // ✅
const invalid: PlatformName = 'invalid-platform'; // ❌ TypeScript error
```

## 🤝 Contributing

We welcome contributions! The library supports 200+ platforms and we're always adding more.

### Adding New Icons
1. Add SVG files to both `/svg` and `/svg_80x80` directories
2. Update `PLATFORM_TO_ICON` mapping in `src/platformIcon.tsx`
3. Follow existing naming conventions

### Development
```bash
git clone https://github.com/getsentry/platformicons.git
cd platformicons
yarn install
yarn build
```

## 📝 Publishing Changes

Platformicons uses GitHub Actions to publish changes. You don't need to update the version in `package.json` since that's done automatically.

1. Make a change but don't update the version in package.json
2. Merge with Master
3. Head to the [Release workflow](https://github.com/getsentry/platformicons/actions/workflows/release.yml) and then run the workflow
4. This will create an issue in [getsentry/publish](https://github.com/getsentry/publish/issues)
5. Add the accepted label to publish

## 📄 License

Font License: SIL OFL 1.1 (http://scripts.sil.org/OFL) - For all font files  
Code License: MIT (http://choosealicense.com/licenses/mit/) - For all other files

