import React from "react";

export const PLATFORM_TO_ICON = {
  android: "android",
  apple: "apple",
  capacitor: "capacitor",
  clojure: "clojure",
  cocoa: "apple",
  "cocoa-objc": "apple",
  "cocoa-swift": "swift",
  cordova: "cordova",
  cpp: "cpp",
  cryengine: "cryengine",
  csharp: "csharp",
  "csharp-aspnetcore": "csharp",
  dart: "dart",
  default: "default",
  dotnet: "dotnet",
  "dotnet-aspnetcore": "dotnet",
  "dotnet-aspnet": "dotnet",
  "dotnet-awslambda": "aws",
  "dotnet-blazor": "blazor",
  "dotnet-csharp": "csharp",
  "dotnet-gcpfunctions": "gcp",
  "dotnet-maui": "maui",
  "dotnet-uno": "uno",
  "dotnet-xamarin": "xamarin",
  dotnetcore: "dotnetcore",
  dotnetfx: "dotnetfx",
  electron: "electron",
  elixir: "elixir",
  flutter: "flutter",
  fsharp: "fsharp",
  go: "go",
  godot: "godot",
  java: "java",
  "java-appengine": "app-engine",
  "java-android": "android",
  "java-log4j": "java",
  "java-log4j2": "java",
  "java-logback": "logback",
  "java-logging": "java",
  "java-spring": "spring",
  "java-spring-boot": "springboot",
  javascript: "javascript",
  "javascript-angular": "angularjs",
  "javascript-angularjs": "angularjs",
  "javascript-backbone": "backbone",
  "javascript-browser": "javascript",
  "javascript-capacitor": "capacitor",
  "javascript-cordova": "cordova",
  "javascript-electron": "electron",
  "javascript-ember": "ember",
  "javascript-gatsby": "gatsby",
  "javascript-ionic": "ionic",
  "javascript-nextjs": "nextjs",
  "javascript-react": "react",
  "javascript-remix": "remix",
  "javascript-svelte": "svelte",
  "javascript-vue": "vue",
  ionic: "ionic",
  kotlin: "kotlin",
  "kotlin-android": "android",
  native: "nativec",
  "native-qt": "qt",
  node: "nodejs",
  "node-awslambda": "aws",
  "node-azurefunctions": "azure",
  "node-connect": "nodejs",
  "node-express": "express",
  "node-gcpfunctions": "gcp",
  "node-koa": "koa",
  perl: "perl",
  php: "php",
  "php-laravel": "laravel",
  "php-monolog": "php",
  "php-symfony2": "symfony",
  "php-symfony": "symfony",
  python: "python",
  "python-aiohttp": "aiohttp",
  "python-awslambda": "aws",
  "python-azurefunctions": "azure",
  "python-bottle": "bottle",
  "python-celery": "celery",
  "python-chalice": "chalice",
  "python-django": "django",
  "python-falcon": "falcon",
  "python-fastapi": "fastapi",
  "python-flask": "flask",
  "python-gcpfunctions": "gcp",
  "python-pylons": "python",
  "python-pyramid": "pyramid",
  "python-pythonawslambda": "aws",
  "python-rq": "redis",
  "python-sanic": "python",
  "python-serverless": "serverless",
  "python-starlette": "starlette",
  "python-tornado": "tornado",
  "python-tryton": "tryton",
  qt: "qt",
  "react-native": "react",
  ruby: "ruby",
  "ruby-rack": "ruby",
  "ruby-rails": "rails",
  "ruby-sinatra": "sinatra",
  rust: "rust",
  "rust-actix": "actix",
  scala: "scala",
  stride3d: "stride3d",
  swift: "swift",
  unity: "unity",
  // This will be deprecated in favor of 'unrealengine'
  ue4: "unreal",
  unreal: "unreal",
  unrealengine: "unreal",
  // Don't add new platforms down here!
  // Please add them where they belong alphabetically
} as const;

function normalizePlatform(platform: string): string {
  // sentry uses format python-django, but docs uses python.django
  // this function normalizes that
  return platform.replace(".", "-");
}

function getIcon(platform: string): Platform {
  const normalizedPlatform = normalizePlatform(platform);
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

type Platform = typeof PLATFORM_TO_ICON[keyof typeof PLATFORM_TO_ICON];

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
  const iconPathRaw = require(`../${
    format === "lg" ? "svg_80x80" : "svg"
  }/${icon}.svg`);
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
