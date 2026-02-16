export function cssVar(name: string, alpha?: number): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (alpha == null) return value;

  // Wrap lch(...) → lch(... / alpha), fallback to wrapping with color-mix for other formats
  const lchMatch = value.match(/^lch\(([^)]+)\)$/);
  if (lchMatch) return `lch(${lchMatch[1]} / ${alpha})`;

  return `color-mix(in srgb, ${value} ${Math.round(alpha * 100)}%, transparent)`;
}
