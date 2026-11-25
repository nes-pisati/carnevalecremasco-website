import type { SiteSettings } from "../types";

export const siteSettingsMock: SiteSettings = {
  organizationName: "Carnevale Cremasco ODV",
  addressLines: ["Via Enrico Fermi · 26013 Crema (CR)"],
  phone: "0373 204766",
  email: "carnevale.crema@libero.it",
  socialLinks: [
    { network: "facebook", label: "Facebook", url: "#" },
    { network: "instagram", label: "Instagram", url: "#" },
  ],
};
