const ITALIAN_PREFIX = "+39";

export function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  const international = digits.startsWith("+") ? digits : `${ITALIAN_PREFIX}${digits}`;
  return `tel:${international}`;
}
