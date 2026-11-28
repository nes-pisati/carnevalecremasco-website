import type { Metadata } from "next";
import type { Photo } from "@/lib/wp/types";

export const SITE_NAME = "Carnevale Cremasco";

export const TITLE_TEMPLATE = `%s · ${SITE_NAME}`;

function withSiteName(title: string): string {
  return TITLE_TEMPLATE.replace("%s", title);
}

const LOCAL_SITE_URL = "http://localhost:3000";

export const siteUrl = new URL(process.env.SITE_URL ?? LOCAL_SITE_URL);

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

const defaultShareImage = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Logo del Carnevale Cremasco",
};

type PageMetadataOptions = {
  title: string;
  isFullTitle?: boolean;
  description: string;
  path: string;
  image?: Photo;
  article?: { publishedTime?: string };
};

export function pageMetadata({
  title,
  isFullTitle = false,
  description,
  path,
  image,
  article,
}: PageMetadataOptions): Metadata {
  const shareImage = image?.file
    ? { url: image.file.url, width: image.file.width, height: image.file.height, alt: image.alt }
    : defaultShareImage;

  return {
    title: isFullTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: SITE_NAME,
      locale: "it_IT",
      url: path,
      title: isFullTitle ? title : withSiteName(title),
      description,
      images: [shareImage],
      ...(article ? { type: "article", publishedTime: article.publishedTime } : { type: "website" }),
    },
  };
}
