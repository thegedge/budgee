import { parseColor } from "./parseColor";

/** Convert any CSS color string to a hex value. */
export function colorToHex(color: string): string {
  if (color.startsWith("#")) return color;

  const { r, g, b } = parseColor(color);
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
