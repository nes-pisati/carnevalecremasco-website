import { Accent } from "@/components/Accent/Accent";
import { Button } from "@/components/Button/Button";
import { DateRibbon } from "@/components/DateRibbon/DateRibbon";
import { FeaturePanel, StatGrid } from "@/components/FeaturePanel/FeaturePanel";
import { Hero } from "@/components/Hero/Hero";
import { InfoCardGrid } from "@/components/InfoCard/InfoCard";
import { Pill } from "@/components/Pill/Pill";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Stat } from "@/components/Stat/Stat";
import { formatMonthsSpan, formatOrdinal } from "@/lib/format";
import { informazioniSections, routes, withAnchor } from "@/lib/routes";
import { visitInfoCards } from "@/lib/visitInfo";
import { getCurrentEdition } from "@/lib/wp/editions";
import { getEvents } from "@/lib/wp/events";

export default async function Home() {
  const edition = await getCurrentEdition();
  const events = await getEvents(edition.year);
  const period = formatMonthsSpan(events.map((event) => event.date));

  return (
    <>
      <Hero
        badges={
          <>
            <Pill tone="red">{formatOrdinal(edition.number, "feminine")} edizione</Pill>
            <Pill>Crema · {period}</Pill>
          </>
        }
        title={
          <>
            Il centro di Crema si riempie di <Accent>colori</Accent>.
          </>
        }
        lead="Carri allegorici, gruppi folkloristici, musica e coriandoli: quattro domeniche di festa per tutta la famiglia."
        actions={
          <>
            <Button href={routes.programma}>Scopri il programma</Button>
            <Button href={withAnchor(routes.informazioni, informazioniSections.comeArrivare)} variant="secondary">
              Come arrivare
            </Button>
          </>
        }
        photo={edition.heroPhoto}
      />

      <DateRibbon events={events} label={`Le domeniche del Carnevale ${edition.year}`} />

      <Section aria-labelledby="visita-title">
        <SectionHeader
          titleId="visita-title"
          title="Tutto per la tua visita"
          subtitle="Biglietti, percorso, parcheggi e come arrivare"
          link={{ href: routes.informazioni, label: "Tutte le informazioni" }}
        />
        <InfoCardGrid items={visitInfoCards()} />
      </Section>

      <Section aria-labelledby="festa-title">
        <FeaturePanel
          titleId="festa-title"
          title="Una festa fatta dalla città, per la città"
          link={{ href: routes.storia, label: "La nostra storia" }}
          aside={
            <StatGrid>
              <Stat value="10k+" label="presenze a domenica" />
              <Stat value="200" label="volontari" tone="blue" />
            </StatGrid>
          }
        >
          <p>
            I carri allegorici sono costruiti a mano, per mesi, dai gruppi del territorio. Sfilano insieme a bande e
            gruppi folkloristici, e alla fine è il pubblico a scegliere il Re Carnevale votando con il QR code.
          </p>
        </FeaturePanel>
      </Section>
    </>
  );
}
