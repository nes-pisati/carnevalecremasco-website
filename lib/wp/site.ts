import { siteSettingsMock } from "./mock/site";
import type { SiteSettings } from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettingsMock;
}
