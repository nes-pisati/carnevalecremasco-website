import type { IsoDate, PartialDate, Time, TimeRange } from "@/lib/wp/types";

const LOCALE = "it-IT";
const TIME_ZONE = "UTC";

const numberFormat = new Intl.NumberFormat(LOCALE, { useGrouping: "always" });
const priceFormat = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  useGrouping: "always",
});
const fileSizeFormat = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 });
const monthListFormat = new Intl.ListFormat(LOCALE, { type: "conjunction" });

const dateFormats = {
  full: new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "short", year: "numeric", timeZone: TIME_ZONE }),
  monthYear: new Intl.DateTimeFormat(LOCALE, { month: "short", year: "numeric", timeZone: TIME_ZONE }),
  monthShort: new Intl.DateTimeFormat(LOCALE, { month: "short", timeZone: TIME_ZONE }),
  monthLong: new Intl.DateTimeFormat(LOCALE, { month: "long", timeZone: TIME_ZONE }),
  longMonthYear: new Intl.DateTimeFormat(LOCALE, { month: "long", year: "numeric", timeZone: TIME_ZONE }),
  dayMonthLong: new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "long", timeZone: TIME_ZONE }),
  weekday: new Intl.DateTimeFormat(LOCALE, { weekday: "long", timeZone: TIME_ZONE }),
};

export const PLACEHOLDER = {
  date: "[data]",
  number: "[n]",
  fileSize: "[peso]",
} as const;

function toDate(value: IsoDate): Date {
  return new Date(`${value}T00:00:00Z`);
}

export function capitalize(text: string): string {
  return text.charAt(0).toLocaleUpperCase(LOCALE) + text.slice(1);
}

export function decapitalize(text: string): string {
  return text.charAt(0).toLocaleLowerCase(LOCALE) + text.slice(1);
}

export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

export function formatVotes(votes: number | null): string {
  return `${votes === null ? PLACEHOLDER.number : formatNumber(votes)} voti`;
}

export function formatPrice(priceInEuro: number | null): string {
  return priceInEuro === null ? "Gratis" : priceFormat.format(priceInEuro);
}

export function formatOrdinal(value: number, gender: "masculine" | "feminine"): string {
  return `${value}${gender === "feminine" ? "ª" : "°"}`;
}

export function formatPartialDate(date: PartialDate | null): string {
  if (!date) return PLACEHOLDER.date;
  const value = new Date(Date.UTC(date.year, date.month - 1, date.day ?? 1));
  return date.day === null ? dateFormats.monthYear.format(value) : dateFormats.full.format(value);
}

export function partialDateToIso(date: PartialDate): string {
  const month = String(date.month).padStart(2, "0");
  if (date.day === null) return `${date.year}-${month}`;
  return `${date.year}-${month}-${String(date.day).padStart(2, "0")}`;
}

export function formatDayOfMonth(date: IsoDate): string {
  return String(toDate(date).getUTCDate());
}

export function formatMonthShort(date: IsoDate): string {
  return dateFormats.monthShort.format(toDate(date));
}

export function formatMonthYear(date: IsoDate): string {
  return capitalize(dateFormats.longMonthYear.format(toDate(date)));
}

export function formatDayMonth(date: IsoDate): string {
  return dateFormats.dayMonthLong.format(toDate(date));
}

export function formatWeekday(date: IsoDate): string {
  return capitalize(dateFormats.weekday.format(toDate(date)));
}

export function formatMonthsSpan(dates: IsoDate[]): string {
  const sorted = [...dates].sort();
  const months = [...new Set(sorted.map((date) => dateFormats.monthLong.format(toDate(date))))];
  const lastDate = sorted.at(-1);
  const year = lastDate ? toDate(lastDate).getUTCFullYear() : "";
  return `${monthListFormat.format(months)} ${year}`.trim();
}

function formatTime(time: Time, dropZeroMinutes: boolean): string {
  const [hours, minutes] = time.split(":");
  const hour = String(Number(hours));
  return dropZeroMinutes && minutes === "00" ? hour : `${hour}:${minutes}`;
}

export function formatTimeRange(range: TimeRange): string {
  if (range.end === null) return `dalle ${formatTime(range.start, false)}`;
  const wholeHours = range.start.endsWith(":00") && range.end.endsWith(":00");
  return `${formatTime(range.start, wholeHours)}–${formatTime(range.end, wholeHours)}`;
}

export function formatTimeRangeLong(range: TimeRange): string {
  const wholeHours = range.start.endsWith(":00") && (range.end === null || range.end.endsWith(":00"));
  const start = `dalle ${formatTime(range.start, wholeHours)}`;
  return range.end === null ? start : `${start} alle ${formatTime(range.end, wholeHours)}`;
}

export function formatFileSize(sizeInBytes: number | null): string {
  if (sizeInBytes === null) return PLACEHOLDER.fileSize;
  const kilobytes = sizeInBytes / 1024;
  if (kilobytes < 1024) return `${fileSizeFormat.format(kilobytes)} KB`;
  return `${fileSizeFormat.format(kilobytes / 1024)} MB`;
}
