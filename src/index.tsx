export { default as PlatformIcon } from "./platformIcon";
export { default as InlinePlatformIcon } from "./inlineIcon";

// Export types for better TypeScript experience
export type { PLATFORM_TO_ICON } from "./platformIcon";

// Preloading utilities
export {
  preloadPlatformIcon,
  preloadPlatformIcons,
  preloadCommonIcons,
  preloadByUsage,
  useSmartPreload,
  ICON_PRIORITIES
} from "./preload";

// Development and debugging tools
export {
  iconDebugger,
  validatePlatform,
  IconDebugOverlay,
  useIconPerformance
} from "./debug";

import { PLATFORM_TO_ICON } from "./platformIcon";
export const platforms = Object.keys(PLATFORM_TO_ICON); 
