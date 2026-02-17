/** Generate a random LCh color string suitable for tag backgrounds. */
export function randomTagColor(): string {
  const l = 40 + Math.floor(Math.random() * 20); // 40-59
  const c = 20 + Math.floor(Math.random() * 30); // 50-79
  const h = Math.floor(Math.random() * 360);
  return `lch(${l} ${c} ${h})`;
}
