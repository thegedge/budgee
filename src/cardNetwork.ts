export type CardNetwork = "Visa" | "Mastercard" | "Amex" | "Discover";

/**
 * Detect a card network from the leading digits of a string (e.g., an account name).
 * Returns null if the string doesn't start with at least 4 digits or no network matches.
 */
export function cardNetworkFromPrefix(value: string): CardNetwork | null {
  const match = value.match(/^(\d{4,})/);
  if (!match) return null;

  const digits = match[1];
  const n4 = Number(digits.slice(0, 4));
  const n2 = Number(digits.slice(0, 2));

  if (digits[0] === "4") return "Visa";

  if ((n2 >= 51 && n2 <= 55) || (n4 >= 2221 && n4 <= 2720)) return "Mastercard";

  if (n2 === 34 || n2 === 37) return "Amex";

  if (n4 === 6011 || (n4 >= 6440 && n4 <= 6499) || n2 === 65) return "Discover";

  return null;
}
