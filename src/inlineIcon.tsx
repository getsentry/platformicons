import * as React from 'react';
import { PLATFORM_TO_ICON } from './platformIcon';

type PlatformName = keyof typeof PLATFORM_TO_ICON;

type Props = React.SVGProps<SVGSVGElement> & {
  platform: PlatformName | string;
  size?: string | number;
  format?: "sm" | "lg";
};

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

const InlinePlatformIcon = React.memo(({
  platform,
  size = 20,
  format = "sm",
  style = {},
  ...otherProps
}: Props) => {
  const [svgContent, setSvgContent] = React.useState<string>("");
  
  const icon = getIcon(platform);

  React.useEffect(() => {
    // Load SVG content as text
    import(`../${format === "lg" ? "svg_80x80" : "svg"}/${icon}.svg`)
      .then(async (module) => {
        const svgUrl = module.default || module;
        const response = await fetch(svgUrl);
        const svgText = await response.text();
        setSvgContent(svgText);
      })
      .catch(async () => {
        // Fallback to default icon
        try {
          const module = await import(`../${format === "lg" ? "svg_80x80" : "svg"}/default.svg`);
          const svgUrl = module.default || module;
          const response = await fetch(svgUrl);
          const svgText = await response.text();
          setSvgContent(svgText);
        } catch {
          // Final fallback - empty SVG
          setSvgContent('<svg viewBox="0 0 20 20"><rect width="20" height="20" fill="#e5e7eb"/></svg>');
        }
      });
  }, [icon, format]);

  if (!svgContent) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        style={style}
        {...otherProps}
      >
        <rect width="20" height="20" fill="#e5e7eb" />
      </svg>
    );
  }

  // Parse SVG and inject size
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = doc.documentElement;
  
  // Extract viewBox or set default
  const viewBox = svgElement.getAttribute('viewBox') || '0 0 20 20';
  
  // Extract inner content
  const innerHTML = svgElement.innerHTML;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      style={style}
      {...otherProps}
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    />
  );
});

InlinePlatformIcon.displayName = 'InlinePlatformIcon';

export default InlinePlatformIcon; 