#!/usr/bin/env node

/**
 * Generates src/icons.generated.ts with static imports for all SVG icons.
 *
 * This replaces dynamic require() calls so that both CJS (webpack/Gatsby)
 * and ESM (Vite/Astro) bundlers can resolve the SVG files.
 *
 * Usage: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

const SVG_DIR = path.resolve(__dirname, '..', 'svg');
const OUTPUT = path.resolve(__dirname, '..', 'src', 'icons.generated.ts');

// Read all .svg filenames (without extension), sorted
const icons = fs
  .readdirSync(SVG_DIR)
  .filter((f) => f.endsWith('.svg'))
  .map((f) => f.replace(/\.svg$/, ''))
  .sort();

const RESERVED_WORDS = new Set([
  'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete',
  'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof',
  'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var',
  'void', 'while', 'with', 'class', 'const', 'enum', 'export', 'extends',
  'import', 'super', 'implements', 'interface', 'let', 'package', 'private',
  'protected', 'public', 'static', 'yield',
]);

// Sanitize icon name into a valid JS identifier
function toIdentifier(name) {
  let id = name.replace(/[^a-zA-Z0-9_$]/g, '_');
  if (RESERVED_WORDS.has(id)) {
    id = `_${id}`;
  }
  return id;
}

const lines = [
  '// AUTO-GENERATED — do not edit. Run `node scripts/generate-icons.js` to regenerate.',
  '',
];

// Small icon imports
for (const icon of icons) {
  lines.push(`import ${toIdentifier(icon)} from '../svg/${icon}.svg';`);
}

lines.push('');

// Large icon imports
for (const icon of icons) {
  lines.push(`import ${toIdentifier(icon)}_lg from '../svg_80x80/${icon}.svg';`);
}

lines.push('');

// Small icon map
lines.push('export const icons: Record<string, string> = {');
for (const icon of icons) {
  lines.push(`  "${icon}": ${toIdentifier(icon)},`);
}
lines.push('};');

lines.push('');

// Large icon map
lines.push('export const iconsLg: Record<string, string> = {');
for (const icon of icons) {
  lines.push(`  "${icon}": ${toIdentifier(icon)}_lg,`);
}
lines.push('};');
lines.push('');

fs.writeFileSync(OUTPUT, lines.join('\n'), 'utf-8');
console.log(`Generated ${OUTPUT} with ${icons.length} icons (×2 sizes = ${icons.length * 2} imports)`);
