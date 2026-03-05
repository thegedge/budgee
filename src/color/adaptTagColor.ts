/**
 * In dark mode, invert the lightness of a tag color so dark tags become
 * light and vice-versa, keeping chroma and hue intact.
 */
export function adaptTagColor(color: string): string {
  if (!isDarkMode()) return color;

  // Handle hex colors by converting to an inverted-lightness version via CSS
  const lchMatch = color.match(/lch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (lchMatch) {
    const L = Number(lchMatch[1]);
    const inverted = 100 - L;
    return `lch(${inverted}% ${lchMatch[3]} ${lchMatch[4]})`;
  }

  // For hex colors, parse RGB → approximate lightness → invert
  const { r, g, b } = parseHexToRgb(color);
  const Y = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  const L = Y > 0.008856 ? 116 * Math.cbrt(Y) - 16 : 903.3 * Y;
  const target = 100 - L;
  const ratio = L > 0 ? target / L : 2;

  // Scale RGB towards inverted lightness (rough but effective for tag pills)
  const scale = (v: number) =>
    Math.min(255, Math.max(0, Math.round(v * ratio + (ratio > 1 ? 30 : 0))));
  return `rgb(${scale(r)}, ${scale(g)}, ${scale(b)})`;
}

function isDarkMode(): boolean {
  const theme = document.documentElement.dataset.theme;
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function parseHexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function linearize(channel: number): number {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
