import { partialDateToIso } from "@/lib/format";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import type { CarnivalEvent, Edition, NewsArticle, SiteSettings, Time } from "@/lib/wp/types";

const EVENT_TIME_ZONE = "Europe/Rome";
const EVENT_CITY = { addressLocality: "Crema", addressRegion: "CR", addressCountry: "IT" } as const;

const offsetFormat = new Intl.DateTimeFormat("en-US", { timeZone: EVENT_TIME_ZONE, timeZoneName: "longOffset" });

function timeZoneOffset(date: string): string {
  const zoneName = offsetFormat.formatToParts(new Date(`${date}T12:00:00Z`)).find((part) => part.type === "timeZoneName");
  const offset = zoneName?.value.replace("GMT", "") ?? "";
  return offset === "" ? "+00:00" : offset;
}

function toDateTime(date: string, time: Time): string {
  return `${date}T${time}:00${timeZoneOffset(date)}`;
}

export function carnivalEventJsonLd(
  event: CarnivalEvent,
  edition: Edition,
  site: SiteSettings,
): Record<string, unknown> {
  const paidPrices = edition.ticketPrices.filter((price) => price.priceInEuro !== null);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.title} · Carnevale Cremasco ${edition.year}`,
    startDate: toDateTime(event.date, event.time.start),
    ...(event.time.end && { endDate: toDateTime(event.date, event.time.end) }),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: event.isFree,
    location: {
      "@type": "Place",
      name: event.place,
      address: { "@type": "PostalAddress", ...EVENT_CITY },
    },
    organizer: { "@type": "Organization", name: site.organizationName },
    ...(event.highlights.length > 0 && { description: event.highlights.join(", ") }),
    ...(!event.isFree &&
      paidPrices.length > 0 && {
        offers: paidPrices.map((price) => ({
          "@type": "Offer",
          name: price.label,
          price: price.priceInEuro,
          priceCurrency: "EUR",
        })),
      }),
  };
}

export function newsArticleJsonLd(article: NewsArticle, site: SiteSettings): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    ...(article.date && { datePublished: partialDateToIso(article.date) }),
    ...(article.cover.file && { image: [article.cover.file.url] }),
    author: { "@type": "Organization", name: site.organizationName },
    publisher: { "@type": "Organization", name: site.organizationName },
  };
}

const LOGO_PATH = "/images/carnevale-cremasco-logo.jpg";

function isPublishedUrl(url: string): boolean {
  return url.startsWith("http");
}

export function websiteJsonLd(site: SiteSettings): Record<string, unknown> {
  const sameAs = site.socialLinks.map((link) => link.url).filter(isPublishedUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: absoluteUrl("/"),
        inLanguage: "it-IT",
      },
      {
        "@type": "Organization",
        name: site.organizationName,
        url: absoluteUrl("/"),
        logo: absoluteUrl(LOGO_PATH),
        email: site.email,
        telephone: site.phone,
        address: { "@type": "PostalAddress", streetAddress: site.addressLines.join(", "), ...EVENT_CITY },
        ...(sameAs.length > 0 && { sameAs }),
      },
    ],
  };
}
