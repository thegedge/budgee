const RELATIVE_DATE_PATTERN = /^(\d+)\s+(day|week|month|year)s?\s+ago$/i;

/**
 * Parse a relative date expression like "10 days ago" or "1 month ago" into an ISO date string.
 * If the input is already an ISO date (YYYY-MM-DD), it is returned as-is.
 * Returns undefined if the input cannot be parsed.
 */
export function parseRelativeDate(input: string): string | undefined {
  const trimmed = input.trim();
  if (!trimmed) return undefined;

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(RELATIVE_DATE_PATTERN);
  if (!match) return undefined;

  const amount = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  const now = new Date();

  switch (unit) {
    case "day":
      now.setDate(now.getDate() - amount);
      break;
    case "week":
      now.setDate(now.getDate() - amount * 7);
      break;
    case "month":
      now.setMonth(now.getMonth() - amount);
      break;
    case "year":
      now.setFullYear(now.getFullYear() - amount);
      break;
  }

  return now.toISOString().slice(0, 10);
}
