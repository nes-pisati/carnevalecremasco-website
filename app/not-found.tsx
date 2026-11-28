import type { Metadata } from "next";
import { Button } from "@/components/Button/Button";
import { InfoCardGrid, type InfoCardItem } from "@/components/InfoCard/InfoCard";
import { PageHead } from "@/components/PageHead/PageHead";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  description: "La pagina che cerchi non esiste o è stata spostata.",
};

const usefulPages: InfoCardItem[] = [
  {
    href: routes.programma,
    title: "Programma",
    text: "Le domeniche di festa e cosa succede",
    icon: "cal",
    color: "red",
  },
  {
    href: routes.informazioni,
    title: "Informazioni",
    text: "Biglietti, percorso e parcheggi",
    icon: "info",
    color: "blue",
  },
  {
    href: routes.news,
    title: "News",
    text: "Le ultime notizie dal Carnevale",
    icon: "press",
    color: "sky",
  },
  {
    href: routes.contatti,
    title: "Contatti",
    text: "Telefono, email e referenti",
    icon: "phone",
    color: "pink",
  },
];

export default function NotFound() {
  return (
    <>
      <PageHead
        title="Pagina non trovata"
        lead="La pagina che cerchi non esiste o è stata spostata. Puoi ripartire dalla home o da una delle pagine qui sotto."
      >
        <Button href={routes.home}>
          Torna alla home
        </Button>
      </PageHead>

      <Section end as="div">
        <SectionHeader titleId="pagine-utili-title" title="Pagine più cercate" />
        <nav aria-labelledby="pagine-utili-title">
          <InfoCardGrid items={usefulPages} />
        </nav>
      </Section>
    </>
  );
}
