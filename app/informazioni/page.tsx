import type { Metadata } from "next";
import Link from "next/link";
import { BulletList } from "@/components/BulletList/BulletList";
import { Card } from "@/components/Card/Card";
import { HowTo } from "@/components/HowTo/HowTo";
import { InfoCardGrid } from "@/components/InfoCard/InfoCard";
import { Label } from "@/components/Label/Label";
import { MapBlock } from "@/components/MapBlock/MapBlock";
import { RouteMap, type MapPin } from "@/components/MapBlock/RouteMap";
import { MoreLink } from "@/components/MoreLink/MoreLink";
import { Notice } from "@/components/Notice/Notice";
import { PageHead } from "@/components/PageHead/PageHead";
import { ParkCard } from "@/components/ParkCard/ParkCard";
import { PriceList } from "@/components/PriceList/PriceList";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Stack } from "@/components/Stack/Stack";
import { googleMapsSearchUrl } from "@/lib/maps";
import {
  convenzioniSections,
  informazioniSections,
  programmaSections,
  routes,
  withAnchor,
} from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { visitInfoCards } from "@/lib/visitInfo";
import { getCurrentEdition } from "@/lib/wp/editions";
import styles from "./page.module.css";

const PARADE_PLACE = "Piazza Giovanni XXIII";
const PARADE_ADDRESS = `${PARADE_PLACE}, Crema (CR)`;
const CAMPER_CLUB = "Camper Club Crema “3C”";

const routePins: MapPin[] = [
  { mark: "1", label: "Ingresso", color: "red", x: 6, y: 66 },
  { mark: "2", label: "Ingresso", color: "blue", x: 46, y: 12 },
  { mark: "i", label: "Punto info · Piazza Duomo", color: "ink", x: 58, y: 74 },
  { mark: "P", label: PARADE_PLACE, color: "pink", x: 34, y: 42 },
];

const entrances = ["[Ingresso 1 · via]", "[Ingresso 2 · via]", "[Ingresso 3 · via]"];

const parkings = [
  {
    from: "Da Piacenza e Cremona",
    name: "Parcheggio Ospedale",
    text: "A piedi da via Matilde di Canossa e via Crispi.",
    color: "red",
  },
  {
    from: "Da Pavia, Lodi e Milano",
    name: "Parcheggio Cimitero Maggiore",
    text: "A piedi dal sottopasso di viale De Gasperi e da viale Repubblica.",
    color: "blue",
  },
  {
    from: "Da Treviglio",
    name: "Via Indipendenza, centro natatorio",
    text: "A piedi da via Chiodo e via Verdi.",
    color: "sky",
  },
  {
    from: "Da Bergamo e Brescia",
    name: "“La Buca” di viale S. Maria",
    text: "A piedi da via Mazzini.",
    color: "pink",
  },
] as const;

export const metadata: Metadata = pageMetadata({
  title: "Informazioni",
  description:
    "Percorso dei carri, biglietti, come arrivare e dove parcheggiare per la sfilata del Carnevale Cremasco.",
  path: routes.informazioni,
});

export default async function InformazioniPage() {
  const edition = await getCurrentEdition();

  return (
    <>
      <PageHead
        breadcrumb={[{ label: "Home", href: routes.home }, { label: "Venire al Carnevale" }]}
        title="Informazioni"
        lead="Tutto quello che serve per goderti la sfilata: il percorso dei carri, i biglietti, come arrivare e dove parcheggiare."
      >
        <nav aria-label="Sezioni della pagina">
          <InfoCardGrid items={visitInfoCards()} />
        </nav>
      </PageHead>

      <Section id={informazioniSections.percorso} aria-labelledby="percorso-title">
        <SectionHeader
          titleId="percorso-title"
          title="Percorso dei carri"
          subtitle="Il circuito nel centro storico di Crema"
        />
        <div className={styles.columns}>
          <RouteMap
            label="Mappa del circuito dei carri nel centro storico (segnaposto)"
            pins={routePins}
            tag="Mappa segnaposto"
          />
          <Stack gap={16}>
            <Card>
              <Label>Le vie del circuito</Label>
              <p className={styles.copy}>
                I carri sfilano lungo un circuito chiuso nel centro storico, intorno a {PARADE_PLACE}: [elenco delle
                vie].
              </p>
            </Card>
            <Card>
              <BulletList title="Ingressi e casse" items={entrances} columns={1} />
              <p className={styles.note}>A ogni ingresso trovi una cassa per i biglietti.</p>
            </Card>
            <ParkCard color="blue" icon="info" eyebrow="Punto info" name="Gazebo in Piazza Duomo">
              Informazioni, prevendita dei biglietti e oggetti smarriti.
            </ParkCard>
          </Stack>
        </div>
      </Section>

      <Section id={informazioniSections.biglietti} aria-labelledby="biglietti-title">
        <SectionHeader titleId="biglietti-title" title="Biglietti" subtitle="Si comprano solo sul posto" />
        <div className={styles.columns}>
          {edition.ticketPrices.length > 0 && (
            <PriceList prices={edition.ticketPrices} caption="Prezzi dei biglietti" />
          )}
          <Stack gap={16}>
            <ParkCard color="red" icon="ticket" eyebrow="Prevendita" name="Gazebo punto info in Piazza Duomo">
              Dalla domenica prima di ogni sfilata, dalle 9.
            </ParkCard>
            <ParkCard color="sky" icon="pin" eyebrow="Il giorno della sfilata" name="Casse agli ingressi del circuito">
              Ogni ingresso ha la sua cassa.
            </ParkCard>
            <Notice>
              <b>Nessuna vendita online.</b> La manifestazione può essere annullata per maltempo, per questo i
              biglietti si comprano solo sul posto.
            </Notice>
            <p className={styles.inset}>
              <MoreLink
                href={withAnchor(routes.convenzioni, convenzioniSections.gruppi)}
                label="Vieni in gruppo? Le proposte per comitive"
              />
            </p>
          </Stack>
        </div>
      </Section>

      <Section id={informazioniSections.comeArrivare} aria-labelledby="come-arrivare-title">
        <SectionHeader
          titleId="come-arrivare-title"
          title="Come arrivare"
          subtitle={`La sfilata è in ${PARADE_ADDRESS}`}
        />
        <div className={styles.howTos}>
          <HowTo icon="car" color="red" title="In auto">
            <p>[testo da scrivere]</p>
          </HowTo>
          <HowTo icon="train" color="blue" title="In treno">
            <p>[testo da scrivere]</p>
          </HowTo>
          <HowTo icon="bus" color="sky" title="In pullman">
            <p>[testo da scrivere]</p>
          </HowTo>
        </div>
        <MapBlock mapsUrl={googleMapsSearchUrl(PARADE_ADDRESS)} />
      </Section>

      <Section id={informazioniSections.parcheggi} end aria-labelledby="parcheggi-title">
        <SectionHeader
          titleId="parcheggi-title"
          title="Dove parcheggiare"
          subtitle="Scegli il parcheggio in base alla tua provenienza"
        />
        <ul role="list" className={styles.grid}>
          {parkings.map((parking) => (
            <li key={parking.name} className={styles.cell}>
              <ParkCard color={parking.color} letter="P" eyebrow={parking.from} name={parking.name}>
                {parking.text}
              </ParkCard>
            </li>
          ))}
          <li className={styles.cell}>
            <ParkCard color="raised" icon="bus" eyebrow="Bus turistici" name="Piazza Rimembranze">
              Fermata alla pensilina di piazza Rimembranze, sosta in Piazzale Croce Rossa.
            </ParkCard>
          </li>
          <li className={styles.cell}>
            <ParkCard color="raised" icon="camper" eyebrow="Camper" name="Raduno camperisti">
              Sosta e programma con il {CAMPER_CLUB}.{" "}
              <Link href={withAnchor(routes.programma, programmaSections.camperisti)}>
                Vai al raduno<span aria-hidden="true">{" →"}</span>
              </Link>
            </ParkCard>
          </li>
        </ul>
      </Section>
    </>
  );
}
