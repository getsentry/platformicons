import { PLATFORM_TO_ICON } from "./platformIcon";
import { icons, iconsLg } from './icons.generated';

/**
 * Insert <link ref="preload" /> elements into the <head> node to preload
 * platfrom icons.  Useful to avoid render blocking / jank when we know we'll be
 * showing platform icons on the next page.
 */
export function preloadIcons(format?: "sm" | "lg") {
  const formats = format ? [format] : ["lg", "sm"];

  const paths: string[] = formats
    .map((f) => {
      const iconMap = f === "lg" ? iconsLg : icons;
      return Object.values(PLATFORM_TO_ICON).map((icon) => iconMap[icon]);
    })
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
