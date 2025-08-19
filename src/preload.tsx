import * as React from 'react';
import { PLATFORM_TO_ICON } from "./platformIcon";

function normalizePlatform(platform: string): string {
  const dashedPlatform = platform.replace(".", "-");
  return dashedPlatform.replace(/^node-/, 'javascript-')
}

function getIcon(platform: string): string {
  const normalizedPlatform = normalizePlatform(platform) as keyof typeof PLATFORM_TO_ICON;
  const icon = PLATFORM_TO_ICON[normalizedPlatform];

  if (icon) {
    return icon;
  }

  if (normalizedPlatform.includes("-")) {
    const [language] = normalizedPlatform.split("-");
    return PLATFORM_TO_ICON[language as keyof typeof PLATFORM_TO_ICON] || "default";
  }

  return "default";
}

// Priority levels for different types of icons
export const ICON_PRIORITIES = {
  CRITICAL: 'high',    // Essential icons like 'default', 'javascript', etc.
  HIGH: 'high',        // Common platforms like 'python', 'react', etc.
  NORMAL: 'auto',      // Regular platforms
  LOW: 'low'           // Rarely used platforms
} as const;

const CRITICAL_PLATFORMS = ['default', 'javascript', 'python', 'java', 'react', 'nodejs'];
const HIGH_PRIORITY_PLATFORMS = [
  'typescript', 'go', 'rust', 'php', 'ruby', 'csharp', 'swift',
  'nextjs', 'express', 'django', 'flask', 'spring', 'rails'
];

function getIconPriority(platform: string): string {
  if (CRITICAL_PLATFORMS.includes(platform)) return ICON_PRIORITIES.CRITICAL;
  if (HIGH_PRIORITY_PLATFORMS.includes(platform)) return ICON_PRIORITIES.HIGH;
  return ICON_PRIORITIES.NORMAL;
}

/**
 * Preload a specific platform icon with priority
 */
export async function preloadPlatformIcon(
  platform: string, 
  format: "sm" | "lg" = "sm",
  priority?: string
): Promise<void> {
  const icon = getIcon(platform);
  const iconPriority = priority || getIconPriority(icon);
  
  try {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';
    
    // Set fetchpriority if supported
    if ('fetchPriority' in link) {
      (link as any).fetchPriority = iconPriority;
    }
    
    // Get the actual URL by importing
    const module = await import(`../${format === "lg" ? "svg_80x80" : "svg"}/${icon}.svg`);
    const iconUrl = module.default || module;
    
    link.href = iconUrl;
    document.head.appendChild(link);
    
    // Clean up after a delay
    setTimeout(() => {
      document.head.removeChild(link);
    }, 10000);
  } catch {
    // Silently fail - icon will be loaded on-demand anyway
  }
}

/**
 * Preload multiple platform icons with intelligent batching
 */
export async function preloadPlatformIcons(
  platforms: string[], 
  format: "sm" | "lg" = "sm"
): Promise<void> {
  // Sort by priority
  const sortedPlatforms = platforms.sort((a, b) => {
    const priorityA = getIconPriority(getIcon(a));
    const priorityB = getIconPriority(getIcon(b));
    
    if (priorityA === ICON_PRIORITIES.CRITICAL && priorityB !== ICON_PRIORITIES.CRITICAL) return -1;
    if (priorityB === ICON_PRIORITIES.CRITICAL && priorityA !== ICON_PRIORITIES.CRITICAL) return 1;
    if (priorityA === ICON_PRIORITIES.HIGH && priorityB === ICON_PRIORITIES.NORMAL) return -1;
    if (priorityB === ICON_PRIORITIES.HIGH && priorityA === ICON_PRIORITIES.NORMAL) return 1;
    return 0;
  });

  // Batch load in chunks to avoid overwhelming the browser
  const BATCH_SIZE = 5;
  for (let i = 0; i < sortedPlatforms.length; i += BATCH_SIZE) {
    const batch = sortedPlatforms.slice(i, i + BATCH_SIZE);
    const promises = batch.map(platform => preloadPlatformIcon(platform, format));
    await Promise.allSettled(promises);
    
    // Small delay between batches
    if (i + BATCH_SIZE < sortedPlatforms.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

/**
 * Preload the most commonly used icons with priority
 */
export async function preloadCommonIcons(format: "sm" | "lg" = "sm"): Promise<void> {
  await preloadPlatformIcons([...CRITICAL_PLATFORMS, ...HIGH_PRIORITY_PLATFORMS], format);
}

/**
 * Preload icons based on platform usage analytics
 */
export async function preloadByUsage(
  usageData: Record<string, number>, 
  threshold: number = 0.1,
  format: "sm" | "lg" = "sm"
): Promise<void> {
  const platforms = Object.entries(usageData)
    .filter(([, usage]) => usage >= threshold)
    .sort(([, a], [, b]) => b - a)
    .map(([platform]) => platform);
  
  await preloadPlatformIcons(platforms, format);
}

/**
 * Smart preloading based on current page platforms
 */
export function useSmartPreload(currentPlatforms: string[], format: "sm" | "lg" = "sm") {
  React.useEffect(() => {
    // Preload related platforms based on current ones
    const relatedPlatforms = new Set<string>();
    
    currentPlatforms.forEach(platform => {
      if (platform.startsWith('javascript-')) {
        relatedPlatforms.add('javascript').add('nodejs').add('react');
      } else if (platform.startsWith('python-')) {
        relatedPlatforms.add('python').add('django').add('flask');
      } else if (platform.startsWith('java-')) {
        relatedPlatforms.add('java').add('spring');
      }
      // Add more platform relationships...
    });
    
    preloadPlatformIcons([...relatedPlatforms], format);
  }, [currentPlatforms, format]);
}

/**
 * Insert <link ref="preload" /> elements into the <head> node to preload
 * platfrom icons.  Useful to avoid render blocking / jank when we know we'll be
 * showing platform icons on the next page.
 */
export function preloadIcons(format?: "sm" | "lg") {
  const formats = format ? [format] : ["lg", "sm"];

  const paths: string[] = formats
    .map((f) =>
      Object.values(PLATFORM_TO_ICON).map((icon) =>
        require(`../${f === "lg" ? "svg_80x80" : "svg"}/${icon}.svg`)
      )
    )
    .flat();

  document.querySelector("head")?.append(
    ...paths.map((path) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = path;
      return link;
    })
  );
}
