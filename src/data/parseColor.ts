export function parseColor(color: string): { r: number; g: number; b: number } {
  if (color.startsWith("#")) {
    return parseHex(color);
  }

  const lch = parseLch(color);
  if (lch) return lch;

  const hslMatch = color.match(/hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\s*\)/);
  if (hslMatch) {
    return hslToRgb(Number(hslMatch[1]), Number(hslMatch[2]), Number(hslMatch[3]));
  }

  return { r: 0, g: 0, b: 0 };
}

function parseHex(hex: string): { r: number; g: number; b: number } {
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

function parseLch(color: string): { r: number; g: number; b: number } | null {
  const match = color.match(/lch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!match) return null;

  const L = Number(match[1]);
  const C = Number(match[2]);
  const H = Number(match[3]);

  // LCh → Lab
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const bLab = C * Math.sin(hRad);

  // Lab → XYZ (D65 illuminant)
  const fy = (L + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - bLab / 200;

  const epsilon = 0.008856;
  const kappa = 903.3;

  const xr = fx ** 3 > epsilon ? fx ** 3 : (116 * fx - 16) / kappa;
  const yr = L > kappa * epsilon ? ((L + 16) / 116) ** 3 : L / kappa;
  const zr = fz ** 3 > epsilon ? fz ** 3 : (116 * fz - 16) / kappa;

  // D65 reference white
  const X = xr * 0.95047;
  const Y = yr * 1.0;
  const Z = zr * 1.08883;

  // XYZ → linear sRGB
  const rl = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
  const gl = -0.969266 * X + 1.8760108 * Y + 0.041556 * Z;
  const bl = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z;

  // Linear → sRGB gamma
  const gamma = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
  };

  return {
    r: Math.round(gamma(rl) * 255),
    g: Math.round(gamma(gl) * 255),
    b: Math.round(gamma(bl) * 255),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}
