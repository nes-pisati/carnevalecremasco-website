export type SocialNetwork = "facebook" | "instagram";

export type SocialLink = {
  network: SocialNetwork;
  label: string;
  url: string;
};

export type SiteSettings = {
  organizationName: string;
  addressLines: string[];
  phone: string;
  email: string;
  socialLinks: SocialLink[];
};

export type ImageFile = {
  url: string;
  width: number;
  height: number;
};

export type Photo = {
  alt: string;
  file: ImageFile | null;
};

export type IsoDate = `${number}-${number}-${number}`;

export type Time = `${number}:${number}`;

export type TimeRange = {
  start: Time;
  end: Time | null;
};

export type PartialDate = {
  year: number;
  month: number;
  day: number | null;
};

export type TicketPrice = {
  label: string;
  detail: string | null;
  priceInEuro: number | null;
  isGroupTicket: boolean;
};

export type Edition = {
  year: number;
  number: number;
  ticketPrices: TicketPrice[];
  heroPhoto: Photo;
};

export type CarnivalEventKind = "opening" | "parade" | "finale";

export type CarnivalEvent = {
  editionYear: number;
  date: IsoDate;
  kind: CarnivalEventKind;
  title: string;
  note: string | null;
  time: TimeRange;
  place: string;
  isFree: boolean;
  market: {
    place: string;
    time: TimeRange;
  } | null;
  highlights: string[];
};

export type Float = {
  editionYear: number;
  rank: number;
  name: string;
  group: string;
  votes: number | null;
  photo: Photo;
};

export type GalleryPhoto = Photo & {
  title: string;
  eventLabel: string | null;
  isFeatured: boolean;
};

export type Gallery = {
  slug: string;
  title: string;
  editionYear: number | null;
  credit: string | null;
  photos: GalleryPhoto[];
};

export type AgreementCategory = "food" | "lodging";

export type Agreement = {
  slug: string;
  category: AgreementCategory;
  name: string;
  address: string;
  phone: string | null;
  mapsUrl: string | null;
  photo: Photo;
};

export type Partner = {
  name: string;
  url: string | null;
  logo: Photo;
};

export type NewsTag = "news" | "eventi" | "progetti";

export type ArticleBlock =
  | { type: "paragraph"; html: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; citation: string | null }
  | {
      type: "attachment";
      title: string;
      url: string;
      fileType: string;
      sizeInBytes: number | null;
    }
  | { type: "gallery"; title: string; credit: string | null; photos: Photo[] }
  | { type: "image"; photo: Photo; caption: string | null; credit: string | null }
  | { type: "floatRanking"; editionYear: number }
  | { type: "editionGallery"; editionYear: number };

export type NewsArticle = {
  slug: string;
  tag: NewsTag;
  date: PartialDate | null;
  title: string;
  excerpt: string;
  cover: Photo;
  isFeatured: boolean;
  body: ArticleBlock[];
};

export type NewsSummary = Omit<NewsArticle, "body">;
