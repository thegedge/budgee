const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: "auto",
});

/**
 * Formats a numeric amount as a USD currency string with thousand separators
 * and 2 decimal places. Negative amounts use a minus sign, not parentheses.
 *
 * For display only — do not use this for storage or computation.
 */
export function formatAmount(amount: number): string {
  return formatter.format(amount);
}
