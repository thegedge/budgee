/**
 * Computes a centered trailing moving average over `data`.
 *
 * Returns null for indices where there are fewer than `window` preceding
 * data points (i.e., the first `window - 1` entries).
 */
export function movingAverage(data: number[], window: number): (number | null)[] {
  if (window < 2) return data.map((v) => v);
  return data.map((_, i) => {
    if (i < window - 1) return null;
    const slice = data.slice(i - window + 1, i + 1);
    return slice.reduce((sum, v) => sum + v, 0) / window;
  });
}

/** Returns an appropriate moving-average window size for `count` data points. */
export function movingAverageWindow(count: number): number {
  return Math.max(2, Math.min(12, Math.round(count * 0.1)));
}
