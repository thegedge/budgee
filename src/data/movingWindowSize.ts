/** Returns an appropriate moving-average window size for `count` data points. */
export function movingWindowSize(count: number): number {
  return Math.max(6, Math.min(12, Math.round(count * 0.1)));
}
