// TODO we could probable make this more dynamic by looking for common prefixes and suffixes
const PREFIXES = /^(SQ \*|TST\* |SP \*?|PAYPAL \*)/i;
const LOCATION_SUFFIX = /((St.\s+)?[^\s]+)?\s*,\s*\w{2}$/;

export const extractMerchant = (description: string): string => {
  const cleaned = description.replace(PREFIXES, "").trim().replace(LOCATION_SUFFIX, "").trim();

  return cleaned
    .toLocaleLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toLocaleUpperCase() + w.slice(1))
    .join(" ");
};
