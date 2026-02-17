import { parseColor } from "./parseColor";

/**
 * Return "white" or "black" depending on which provides better contrast
 * against the given CSS color string.
 */
export function contrastTextColor(color: string): "white" | "black" {
  const lightness = perceptualLightness(color);
  return lightness > 70 ? "black" : "white";
}

function perceptualLightness(color: string): number {
  const lchMatch = color.match(/lch\(\s*([\d.]+)\s/);
  if (lchMatch) {
    return Number(lchMatch[1]);
  }

  // Fall back to relative luminance for hex/hsl legacy values
  const { r, g, b } = parseColor(color);
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  // Convert relative luminance (0-1) to approximate CIE L* (0-100)
  const Y = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  return Y > 0.008856 ? 116 * Math.cbrt(Y) - 16 : 903.3 * Y;
}
