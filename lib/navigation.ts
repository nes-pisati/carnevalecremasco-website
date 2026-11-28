import type { IconName } from "@/components/Icon/icons";
import type { AccentColor } from "@/components/fills";
import type { SocialNetwork } from "@/lib/wp/types";
import { isCurrentSection, routes } from "./routes";

export type NavChild = {
  label: string;
  description: string;
  href: string;
  icon: IconName;
  color: AccentColor;
};

export type NavLinkItem = {
  kind: "link";
  id: string;
  label: string;
  href: string;
};

export type NavGroupItem = {
  kind: "group";
  id: string;
  label: string;
  children: NavChild[];
};

export type NavItem = NavLinkItem | NavGroupItem;

export const mainNavigation: NavItem[] = [
  { kind: "link", id: "programma", label: "Programma", href: routes.programma },
  {
    kind: "group",
    id: "venire",
    label: "Venire al Carnevale",
    children: [
      {
        label: "Informazioni",
        description: "Percorso, biglietti, come arrivare, parcheggi",
        href: routes.informazioni,
        icon: "ticket",
        color: "red",
      },
      {
        label: "Convenzioni",
        description: "Dove mangiare, dormire, gruppi e turismo",
        href: routes.convenzioni,
        icon: "fork",
        color: "blue",
      },
    ],
  },
  {
    kind: "group",
    id: "carnevale",
    label: "Il Carnevale",
    children: [
      {
        label: "Storia del Carnevale",
        description: "Dal XV secolo al Gagèt di oggi",
        href: routes.storia,
        icon: "mask",
        color: "sky",
      },
      {
        label: "Foto",
        description: "Le immagini delle sfilate",
        href: routes.foto,
        icon: "camera",
        color: "pink",
      },
    ],
  },
  { kind: "link", id: "news", label: "News", href: routes.news },
  { kind: "link", id: "contatti", label: "Contatti", href: routes.contatti },
];

export function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.kind === "link") return isCurrentSection(pathname, item.href);
  return item.children.some((child) => isCurrentSection(pathname, child.href));
}

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Visita",
    links: [
      { label: "Programma", href: routes.programma },
      { label: "Informazioni", href: routes.informazioni },
      { label: "Convenzioni", href: routes.convenzioni },
    ],
  },
  {
    title: "Il Carnevale",
    links: [
      { label: "Storia del Carnevale", href: routes.storia },
      { label: "Foto", href: routes.foto },
      { label: "News", href: routes.news },
    ],
  },
  {
    title: "Associazione",
    links: [
      { label: "Chi siamo", href: routes.storia },
      { label: "Partecipare al Carnevale", href: routes.contatti },
      { label: "Stampa", href: routes.contatti },
    ],
  },
];

export const socialIcons: Record<SocialNetwork, IconName> = {
  facebook: "fb",
  instagram: "ig",
};
