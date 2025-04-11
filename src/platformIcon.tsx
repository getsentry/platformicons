import * as React from 'react';

export const PLATFORM_TO_ICON = {
  amazon: "amazon",
  amd: "amd",
  android: "android",
  "android-phone": "android-phone",
  "android-tablet": "android-tablet",
  anthropic: "anthropic",
  apple: "apple",
  "apple-ipad": "apple-ipad",
  "apple-iphone": "apple-iphone",
  "apple-tv": "apple-tv",
  "apple-watch": "apple-watch",
  arm: "arm",
  bun: "bun",
  capacitor: "capacitor",
  chrome: "chrome",
  chromium: "chromium",
  clojure: "clojure",
  cocoa: "apple",
  "cocoa-objc": "apple",
  "cocoa-swift": "swift",
  cohere: "cohere",
  cordova: "cordova",
  cloudflare: "cloudflare",
  cpp: "cpp",
  cryengine: "cryengine",
  crystal: "crystal",
  css: "css",
  csharp: "csharp",
  "csharp-aspnetcore": "csharp",
  dart: "dart",
  default: "default",
  deno: "deno",
  dotnet: "dotnet",
  "dotnet-aspnetcore": "dotnet",
  "dotnet-aspnet": "dotnet",
  "dotnet-awslambda": "awslambda",
  "dotnet-blazor": "blazor",
  "dotnet-csharp": "csharp",
  "dotnet-gcpfunctions": "gcp-functions",
  "dotnet-maui": "maui",
  "dotnet-uno": "uno",
  "dotnet-xamarin": "xamarin",
  dotnetcore: "dotnetcore",
  dotnetfx: "dotnetfx",
  dotnetframework: "dotnetframework",
  edge: "edge",
  "edge-legacy": "edge-legacy",
  electron: "electron",
  elixir: "elixir",
  firefox: "firefox",
  flutter: "flutter",
  font: "font",
  fsharp: "fsharp",
  git: "git",
  go: "go",
  "go-echo": "echo",
  "go-fasthttp": "fasthttp",
  "go-fiber": "fiber",
  "go-gin": "gin",
  "go-iris": "iris",
  "go-martini": "martini",
  "go-negroni": "go",
  godot: "godot",
  huggingface: "huggingface",
  "internet-explorer": "internet-explorer",
  java: "java",
  "java-appengine": "app-engine",
  "java-android": "android",
  "java-log4j": "java",
  "java-log4j2": "java",
  "java-logback": "logback",
  "java-logging": "java",
  "java-ray": "ray",
  "java-spring": "spring",
  "java-spring-boot": "springboot",
  javascript: "javascript",
  "javascript-alpinejs": "alpinejs",
  "javascript-analogjs": "analogjs",
  "javascript-angular": "angularjs",
  "javascript-angularjs": "angularjs",
  "javascript-astro": "astro",
  "javascript-awslambda": "awslambda",
  "javascript-azurefunctions": "azure-functions",
  "javascript-backbone": "backbone",
  "javascript-browser": "javascript",
  "javascript-capacitor": "capacitor",
  "javascript-cloudflare-pages": "cloudflare-pages",
  "javascript-cloudflare-workers": "cloudflare-workers",
  "javascript-connect": "connect",
  "javascript-cordova": "cordova",
  "javascript-electron": "electron",
  "javascript-ember": "ember",
  "javascript-express": "express",
  "javascript-fastify": "fastify",
  "javascript-gatsby": "gatsby",
  "javascript-gcpfunctions": "gcp-functions",
  "javascript-hapi": "hapi",
  "javascript-hono": "hono",
  "javascript-hydrogen": "hydrogen",
  "javascript-ionic": "ionic",
  "javascript-koa": "koa",
  "javascript-lit": "lit",
  "javascript-meteor": "meteor",
  "javascript-million": "million",
  "javascript-nestjs": "nestjs",
  "javascript-nextjs": "nextjs",
  "javascript-node": "nodejs",
  "javascript-nuxt": "nuxt",
  "javascript-opennext": "opennext",
  "javascript-qwik": "qwik",
  "javascript-react": "react",
  "javascript-remix": "remix",
  "javascript-serverlesscloud": "serverless",
  "javascript-solid": "solid",
  "javascript-solidstart": "solidstart",
  "javascript-svelte": "svelte",
  "javascript-sveltekit": "svelte",
  "javascript-tanstackstart-react": "tanstack",
  "javascript-vue": "vue",
  "javascript-wasm": "wasm",
  ionic: "ionic",
  kotlin: "kotlin",
  "kotlin-android": "android",
  langchain: "langchain",
  launchdarkly: "launchdarkly",
  linux: "linux",
  mono: "mono",
  motorola: "motorola",
  native: "nativec",
  "native-qt": "qt",
  nintendo: "nintendo",
  "nintendo-switch": "nintendo-switch",
  node: "nodejs",
  nvidia: "nvidia",
  openai: "openai",
  openfeature: "openfeature",
  opera: "opera",
  perl: "perl",
  php: "php",
  playstation: "playstation",
  powershell: "powershell",
  "php-laravel": "laravel",
  "php-livewire": "livewire",
  "php-magento": "magento",
  "php-monolog": "php",
  "php-symfony2": "symfony",
  "php-symfony": "symfony",
  python: "python",
  "python-aiohttp": "aiohttp",
  "python-airflow": "apache-airflow",
  "python-ariadne": "ariadne",
  "python-asyncpg": "postgresql",
  "python-awslambda": "awslambda",
  "python-azurefunctions": "azure-functions",
  "python-beam": "apache-beam",
  "python-boto3": "aws",
  "python-bottle": "bottle",
  "python-celery": "celery",
  "python-chalice": "chalice",
  "python-clickhouse-driver": "clickhouse",
  "python-django": "django",
  "python-dramatiq": "dramatiq",
  "python-falcon": "falcon",
  "python-fastapi": "fastapi",
  "python-flask": "flask",
  "python-gcpfunctions": "gcp-functions",
  "python-gnu_backtrace": "gnu",
  "python-gql": "graphql",
  "python-graphene": "graphene",
  "python-grpc": "grpc",
  "python-httpx": "httpx",
  "python-huey": "huey",
  "python-litestar": "litestar",
  "python-loguru": "loguru",
  "python-pylons": "python",
  "python-pymongo": "mongodb",
  "python-pyramid": "pyramid",
  "python-pythonawslambda": "awslambda",
  "python-quart": "quart",
  "python-ray": "ray",
  "python-redis": "redis",
  "python-rq": "redis",
  "python-sanic": "sanic",
  "python-serverless": "serverless",
  "python-starlette": "starlette",
  "python-strawberry": "strawberry",
  "python-spark": "apache-spark",
  "python-sqlalchemy": "sqlalchemy",
  "python-tornado": "tornado",
  "python-tryton": "tryton",
  "python-typer": "typer",
  qq: "qq",
  qt: "qt",
  "react-native": "react-native",
  "react-router": "react-router",
  ruby: "ruby",
  "ruby-activeadmin": "activeadmin",
  "ruby-grape": "grape",
  "ruby-hanami": "hanami",
  "ruby-padrino": "padrino",
  "ruby-rack": "ruby",
  "ruby-rails": "rails",
  "ruby-sidekiq": "sidekiq",
  "ruby-sinatra": "sinatra",
  "ruby-trailblazer": "trailblazer",
  rust: "rust",
  "rust-actix": "actix",
  safari: "safari",
  samsung: "samsung",
  scala: "scala",
  stride3d: "stride3d",
  supabase: "supabase",
  sql: "sql",
  sqlserver: "sqlserver",
  swift: "swift",
  tauri: "tauri",
  ubuntu: "ubuntu",
  unity: "unity",
  unleash: "unleash",
  // This will be deprecated in favor of 'unrealengine'
  ue4: "unreal",
  unreal: "unreal",
  unrealengine: "unreal",
  uwp: "windows",
  visualbasic: "visual-basic",
  vscode: "vscode",
  windows: "windows",
  xbox: "xbox",
  // Don't add new platforms down here!
  // Please add them where they belong alphabetically
} as const;


function normalizePlatform(platform: string): string {
  // sentry uses format python-django, but docs uses python.django
  // this function normalizes that
  const dashedPlatform =  platform.replace(".", "-");

  // Allow `node` as an alias for `javascript` to ensure backwards compatibility
  return dashedPlatform.replace(/^node-/, 'javascript-')
}

function getIcon(platform: string): Platform {
  const normalizedPlatform = normalizePlatform(platform) as keyof typeof PLATFORM_TO_ICON;
  const icon = PLATFORM_TO_ICON[normalizedPlatform];

  if (icon) {
    return icon;
  }

  if (normalizedPlatform.includes("-")) {
    return getLanguageIcon(normalizedPlatform);
  }

  return "default";
}

function getLanguageIcon(platform: string): Platform {
  const [language] = normalizePlatform(platform).split("-");

  return getIcon(language);
}

type Platform = (typeof PLATFORM_TO_ICON)[keyof typeof PLATFORM_TO_ICON];

type Props = React.HTMLAttributes<HTMLDivElement | HTMLImageElement> & {
  platform: string;
  size?: string | number;
  format?: "sm" | "lg";
  radius?: number | null;
  withLanguageIcon?: boolean;
  languageIconStyles?: React.CSSProperties;
};

const PlatformIcon = ({
  platform,
  size = 20,
  format = "sm",
  radius = 3,
  withLanguageIcon,
  languageIconStyles = {},
  style = {},
  ...otherProps
}: Props) => {
  const icon = getIcon(platform);
  const iconPathRaw = require(
    `../${format === "lg" ? "svg_80x80" : "svg"}/${icon}.svg`,
  );
  const iconPath = iconPathRaw?.default ?? iconPathRaw;

  const languageIcon = getLanguageIcon(platform);
  const languageIconPathRaw = require(`../svg/${languageIcon}.svg`);
  const languageIconPath = languageIconPathRaw?.default ?? languageIconPathRaw;

  if (withLanguageIcon && languageIcon !== icon && languageIcon !== "default") {
    return (
      <div {...otherProps} style={{ position: "relative", ...style }}>
        <img
          src={iconPath}
          width={size}
          height={size}
          style={{ borderRadius: `${radius}px` }}
        />
        <img
          src={languageIconPath}
          style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            height: "30%",
            width: "30%",
            borderRadius: "2px",
            ...languageIconStyles,
          }}
        />
      </div>
    );
  }

  return (
    <img
      src={iconPath}
      width={size}
      height={size}
      {...otherProps}
      style={{ borderRadius: `${radius}px`, ...style }}
    />
  );
};

export default PlatformIcon;
