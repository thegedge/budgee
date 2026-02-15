const PREFIXES = /^(SQ \*|TST\* |SP \*|PAYPAL \*)/i;
const LOCATION_SUFFIX = /,\s*[A-Z]{2}$/;

export function extractMerchant(description: string): string {
  let cleaned = description.replace(PREFIXES, "").trim();
  cleaned = cleaned.replace(LOCATION_SUFFIX, "").trim();
  return cleaned
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
