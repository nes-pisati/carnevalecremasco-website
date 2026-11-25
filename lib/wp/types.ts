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
