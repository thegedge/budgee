/**
 * Computes a trailing moving median over `data`.
 *
 * For early indices with fewer than `window` points, computes the median
 * over all available preceding points (partial window).
 */
export function movingMedian(data: number[], window: number): number[] {
  if (window < 2) return data.map((v) => v);
  return data.map((_, i) => {
    const start = Math.max(0, i - window + 1);
    const sorted = data.slice(start, i + 1).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  });
}
