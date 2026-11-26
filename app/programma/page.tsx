import type { Metadata } from "next";
import { BulletList } from "@/components/BulletList/BulletList";
import { Button } from "@/components/Button/Button";
import { ContactLink } from "@/components/ContactLink/ContactLink";
import { DateRibbon } from "@/components/DateRibbon/DateRibbon";
import { DayCard } from "@/components/DayCard/DayCard";
import { Fact, FactList } from "@/components/FactList/FactList";
import { cycleAccent } from "@/components/fills";
import { InviteBox } from "@/components/InviteBox/InviteBox";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { Label } from "@/components/Label/Label";
import { LinkPanel } from "@/components/LinkPanel/LinkPanel";
import { MoreLink } from "@/components/MoreLink/MoreLink";
import { Notice } from "@/components/Notice/Notice";
import { PageHead } from "@/components/PageHead/PageHead";
import { ParkCard } from "@/components/ParkCard/ParkCard";
import { Pill } from "@/components/Pill/Pill";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { SplitPanel } from "@/components/SplitPanel/SplitPanel";
import { Stack } from "@/components/Stack/Stack";
import { formatMonthsSpan, formatOrdinal, formatTimeRange, formatTimeRangeLong } from "@/lib/format";
import { toTelHref } from "@/lib/phone";
import { informazioniSections, routes, withAnchor } from "@/lib/routes";
import { carnivalEventJsonLd } from "@/lib/structuredData";
import { getCurrentEdition } from "@/lib/wp/editions";
import { getEvents } from "@/lib/wp/events";
import { getSiteSettings } from "@/lib/wp/site";
import styles from "./page.module.css";

const MARKET_ORGANIZER = "Agenzia Cinzia Miraglio";
const CAMPER_CLUB = "Camper Club Crema “3C”";
const marketProducts = ["Tortelli cremaschi", "Salva cremasco", "Salame cremasco", "Artigianato e regali creativi"];

export async function generateMetadata(): Promise<Metadata> {
  const edition = await getCurrentEdition();
  return {
    title: `Programma ${edition.year} · Carnevale Cremasco`,
    description: "Le domeniche del Carnevale Cremasco nel centro di Crema: cosa succede, dove e a che ora.",
  };
}

export default async function ProgrammaPage() {
  const edition = await getCurrentEdition();
  const events = await getEvents(edition.year);
  const site = await getSiteSettings();
  const period = formatMonthsSpan(events.map((event) => event.date));
  const market = events.find((event) => event.market !== null)?.market ?? null;
  const phoneInfo = (
    <>
      Per informazioni: <a href={toTelHref(site.phone)}>{site.phone}</a>
    </>
  );
  const ticketsHref = withAnchor(routes.informazioni, informazioniSections.biglietti);

  return (
    <>
      <JsonLd data={events.map((event) => carnivalEventJsonLd(event, edition, site))} />

      <PageHead
        badges={
          <>
            <Pill tone="red">{formatOrdinal(edition.number, "feminine")} edizione</Pill>
            <Pill>Crema · {period}</Pill>
          </>
        }
        title={`Programma ${edition.year}`}
        lead="Quattro domeniche di festa nel centro di Crema: ecco cosa succede, dove e a che ora."
      >
        <Notice>Il programma può subire variazioni. In caso di maltempo la manifestazione può essere annullata.</Notice>
      </PageHead>

      {events.length > 0 && (
        <>
          <DateRibbon events={events} label={`Le domeniche del Carnevale ${edition.year}`} variant="panel" />
          <Section as="div" className={styles.days}>
            {events.map((event, index) => (
              <DayCard key={event.date} event={event} color={cycleAccent(index)} ticketsHref={ticketsHref} />
            ))}
          </Section>
        </>
      )}

      {market && (
        <Section id="mercatini" aria-labelledby="mercatini-title">
          <SectionHeader
            titleId="mercatini-title"
            title="Mercatini di Carnevale"
            subtitle={`${market.place}, ${formatTimeRangeLong(market.time)}`}
          />
          <SplitPanel
            main={
              <Stack gap={24}>
                <p>
                  Nelle domeniche dei corsi mascherati {market.place} si riempie di banchi: prodotti tipici del
                  territorio, artigianato e regali creativi.
                </p>
                <FactList>
                  <Fact icon="cal" label="Quando">
                    Domeniche dei corsi mascherati
                  </Fact>
                  <Fact icon="pin" label="Dove">
                    {market.place}, {formatTimeRange(market.time)}
                  </Fact>
                </FactList>
                <BulletList title="Sui banchi" items={marketProducts} color="blue" />
              </Stack>
            }
            aside={
              <Stack gap={16}>
                <Label>I laboratori</Label>
                <ParkCard color="pink" icon="child" eyebrow="Per i bambini" name="Crea la tua mascherina">
                  {phoneInfo}
                </ParkCard>
                <ParkCard color="cream" icon="fork" eyebrow="Per gli adulti" name="Scuola del tortello cremasco">
                  {phoneInfo}
                </ParkCard>
              </Stack>
            }
          />
          <div className={styles.invite}>
            <InviteBox
              color="sky"
              discColor="blue"
              title="Vuoi esporre?"
              actions={
                <>
                  <ContactLink kind="email" value={site.email} appearance="primary" />
                  <ContactLink kind="phone" value={site.phone} appearance="light" />
                </>
              }
            >
              <p>
                I mercatini sono organizzati dall’{MARKET_ORGANIZER}: scrivi o chiama per sapere come partecipare.
              </p>
            </InviteBox>
          </div>
        </Section>
      )}

      <Section id="camperisti" aria-labelledby="camperisti-title">
        <SectionHeader titleId="camperisti-title" title="Raduno camperisti" subtitle="22ª edizione" />
        <SplitPanel
          tone="cream"
          asideAlign="center"
          mainWidth="wide"
          main={
            <Stack gap={16}>
              <p>Il Carnevale ospita il raduno dei camperisti, organizzato con il {CAMPER_CLUB}.</p>
              <FactList>
                <Fact icon="cal" label="Date">
                  [date]
                </Fact>
                <Fact icon="camper" label="Con">
                  {CAMPER_CLUB}
                </Fact>
              </FactList>
              <p>
                <MoreLink
                  href={withAnchor(routes.informazioni, informazioniSections.parcheggi)}
                  label="Dove parcheggiare"
                />
              </p>
            </Stack>
          }
          aside={
            <Stack gap={12}>
              <Label>Per informazioni</Label>
              <ContactLink kind="phone" value={site.phone} />
              <ContactLink kind="email" value={site.email} />
            </Stack>
          }
        />
      </Section>

      <Section end aria-labelledby="visita-title">
        <LinkPanel title="Prepara la tua visita" titleId="visita-title">
          <Button href={ticketsHref} icon="ticket">
            Biglietti
          </Button>
          <Button
            href={withAnchor(routes.informazioni, informazioniSections.comeArrivare)}
            icon="pin"
            variant="surface"
          >
            Come arrivare
          </Button>
        </LinkPanel>
      </Section>
    </>
  );
}
