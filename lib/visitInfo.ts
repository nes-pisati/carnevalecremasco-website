import type { InfoCardItem } from "@/components/InfoCard/InfoCard";
import { informazioniSections, routes, withAnchor } from "@/lib/routes";

export function visitInfoCards(): InfoCardItem[] {
  return [
    {
      href: withAnchor(routes.informazioni, informazioniSections.biglietti),
      title: "Biglietti",
      text: "Intero 10 €, ridotto 5 €, gratis fino a 8 anni",
      icon: "ticket",
      color: "red",
    },
    {
      href: withAnchor(routes.informazioni, informazioniSections.percorso),
      title: "Percorso",
      text: "Il circuito dei carri nel centro storico",
      icon: "pin",
      color: "blue",
    },
    {
      href: withAnchor(routes.informazioni, informazioniSections.parcheggi),
      title: "Parcheggi",
      text: "Aree per auto, pullman e camper",
      icon: "park",
      color: "sky",
    },
    {
      href: withAnchor(routes.informazioni, informazioniSections.comeArrivare),
      title: "Come arrivare",
      text: "In auto, in treno e in pullman",
      icon: "bus",
      color: "pink",
    },
  ];
}
