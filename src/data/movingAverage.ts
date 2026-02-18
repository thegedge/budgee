/**
 * Computes a trailing moving median over `data`.
 *
 * Returns null for indices where there are fewer than `window` preceding
 * data points (i.e., the first `window - 1` entries).
 */
export function movingMedian(data: number[], window: number): (number | null)[] {
  if (window < 2) return data.map((v) => v);
  return data.map((_, i) => {
    if (i < window - 1) return null;
    const sorted = data.slice(i - window + 1, i + 1).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  });
}
