import type { Metadata } from "next";
import { Button } from "@/components/Button/Button";
import { ContactLink } from "@/components/ContactLink/ContactLink";
import { FeaturePanel, StatGrid } from "@/components/FeaturePanel/FeaturePanel";
import { InfoNote } from "@/components/InfoNote/InfoNote";
import { Label } from "@/components/Label/Label";
import { MoreLink } from "@/components/MoreLink/MoreLink";
import { PageHead } from "@/components/PageHead/PageHead";
import { PhotoGrid, type PhotoGridItem } from "@/components/PhotoGrid/PhotoGrid";
import { PlaceCard } from "@/components/PlaceCard/PlaceCard";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { SectionIndex, type SectionIndexItem } from "@/components/SectionIndex/SectionIndex";
import { SplitPanel } from "@/components/SplitPanel/SplitPanel";
import { Stack } from "@/components/Stack/Stack";
import { Stat, StatBox } from "@/components/Stat/Stat";
import { decapitalize, formatPrice } from "@/lib/format";
import { convenzioniSections, informazioniSections, routes, withAnchor } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { getAgreements } from "@/lib/wp/agreements";
import { findGroupTicket, getCurrentEdition } from "@/lib/wp/editions";
import { getSiteSettings } from "@/lib/wp/site";
import styles from "./page.module.css";

const PRO_LOCO_OFFICE = "Piazza Duomo 22";

const sectionIndex: SectionIndexItem[] = [
  { href: `#${convenzioniSections.pranzare}`, label: "Dove pranzare" },
  { href: `#${convenzioniSections.alloggiare}`, label: "Dove alloggiare" },
  { href: `#${convenzioniSections.gruppi}`, label: "Proposte gruppi" },
  { href: `#${convenzioniSections.turismo}`, label: "Proposte turistiche" },
  { href: `#${convenzioniSections.visitare}`, label: "Visitare Crema" },
];

const cremaPhotos: PhotoGridItem[] = [
  { photo: { alt: "Foto: il Duomo di Crema", file: null }, placeholderColor: "periwinkle", wide: true },
  { photo: { alt: "Foto: le vie del centro storico", file: null }, placeholderColor: "pink" },
  { photo: { alt: "Foto: Santa Maria della Croce", file: null }, placeholderColor: "sky" },
];

const PLACE_COLORS = ["blue", "sky", "pink"] as const;

function placeColor(index: number) {
  return PLACE_COLORS[index % PLACE_COLORS.length];
}

export const metadata: Metadata = pageMetadata({
  title: "Convenzioni",
  description:
    "Dove pranzare, dove dormire e le proposte per gruppi e turisti per vivere il Carnevale Cremasco e scoprire Crema.",
  path: routes.convenzioni,
});

export default async function ConvenzioniPage() {
  const [restaurants, lodgings, edition, site] = await Promise.all([
    getAgreements("food"),
    getAgreements("lodging"),
    getCurrentEdition(),
    getSiteSettings(),
  ]);
  const groupTicket = findGroupTicket(edition);
  const turismoHref = `#${convenzioniSections.turismo}`;

  return (
    <>
      <PageHead
        breadcrumb={[{ label: "Home", href: routes.home }, { label: "Venire al Carnevale" }]}
        title="Convenzioni"
        lead="Dove pranzare, dove dormire e le proposte per gruppi e turisti: tutto per vivere il Carnevale e scoprire Crema."
      >
        <SectionIndex items={sectionIndex} label="Sezioni della pagina" />
      </PageHead>

      <Section id={convenzioniSections.pranzare} aria-labelledby="pranzare-title">
        <SectionHeader
          titleId="pranzare-title"
          title="Dove pranzare"
          subtitle="Il punto ristoro e i ristoranti convenzionati"
        />
        <ul role="list" className={`${styles.grid} ${styles.four}`}>
          <li className={styles.cell}>
            <InfoNote icon="fork" color="red" eyebrow="Dentro la festa" title="Punto ristoro del Carnevale">
              <p>Piazza Madeo · dalle 10 alle 21</p>
            </InfoNote>
          </li>
          {restaurants.map((place, index) => (
            <li key={place.slug} className={styles.cell}>
              <PlaceCard place={place} placeholderColor={placeColor(index)} sizes="(min-width: 901px) 25vw, 100vw" />
            </li>
          ))}
        </ul>
      </Section>

      <Section id={convenzioniSections.alloggiare} aria-labelledby="alloggiare-title">
        <SectionHeader titleId="alloggiare-title" title="Dove alloggiare" subtitle="Strutture convenzionate" />
        <ul role="list" className={`${styles.grid} ${styles.three}`}>
          {lodgings.map((place, index) => (
            <li key={place.slug} className={styles.cell}>
              <PlaceCard place={place} placeholderColor={placeColor(index)} sizes="(min-width: 901px) 33vw, 100vw" />
            </li>
          ))}
          <li className={styles.cell}>
            <InfoNote icon="bed" color="cream" title="Cerchi altre soluzioni?">
              <p>La Pro Loco di Crema ti aiuta a trovare dove dormire in città e nei dintorni.</p>
              <MoreLink href={turismoHref} label="Contatta la Pro Loco" />
            </InfoNote>
          </li>
        </ul>
      </Section>

      <Section id={convenzioniSections.gruppi} aria-labelledby="gruppi-title">
        <FeaturePanel
          titleId="gruppi-title"
          eyebrow="Proposte gruppi"
          title="Per CRAL, AUSER e associazioni"
          discColor="blue"
          align="start"
          actions={
            <>
              <Button href={withAnchor(routes.informazioni, informazioniSections.parcheggi)} variant="light">
                Parcheggio bus
              </Button>
              <Button href={`#${convenzioniSections.pranzare}`} variant="dim">
                Dove pranzare
              </Button>
            </>
          }
          aside={
            <StatGrid columns={1}>
              {groupTicket && (
                <Stat
                  value={formatPrice(groupTicket.priceInEuro)}
                  label={
                    groupTicket.detail ? `Biglietto gruppi · ${decapitalize(groupTicket.detail)}` : "Biglietto gruppi"
                  }
                  valueColor="red"
                  layout="inline"
                />
              )}
              <StatBox title="Prevendita gruppi" tone="blue">
                <p>Punto info di Piazza Duomo, dalle 9 alle 12</p>
              </StatBox>
              <StatBox title="Segreteria" tone="cream">
                <div className={styles.contacts}>
                  <ContactLink kind="phone" value={site.phone} />
                  <ContactLink kind="email" value={site.email} />
                </div>
              </StatBox>
            </StatGrid>
          }
        >
          <p>
            Organizzi una gita al Carnevale? Per i gruppi c’è un biglietto dedicato e la prevendita riservata al punto
            info.
          </p>
        </FeaturePanel>
      </Section>

      <Section id={convenzioniSections.turismo} aria-labelledby="turismo-title">
        <SectionHeader titleId="turismo-title" title="Proposte turistiche" />
        <SplitPanel
          asideAlign="center"
          main={
            <Stack gap={16}>
              <Label as="p">Pro Loco Crema</Label>
              <h3 className={styles.subheading}>Visite guidate e proposte per il tuo weekend</h3>
              <p className={styles.muted}>
                Per itinerari in città, visite guidate e pacchetti turistici rivolgiti all’ufficio informazioni della
                Pro Loco.
              </p>
            </Stack>
          }
          aside={
            <div className={styles.contacts}>
              <ContactLink
                kind="address"
                value={`${PRO_LOCO_OFFICE}, Crema (CR)`}
                label={`Ufficio informazioni · ${PRO_LOCO_OFFICE}`}
              />
              <ContactLink kind="phone" value={null} />
              <ContactLink kind="email" value={null} />
            </div>
          }
        />
      </Section>

      <Section id={convenzioniSections.visitare} end aria-labelledby="visitare-title">
        <SectionHeader
          titleId="visitare-title"
          title="Visitare Crema"
          subtitle="Il centro storico a due passi dalla sfilata"
        />
        <div className={styles.visit}>
          <Stack gap={16}>
            <p className={styles.copy}>
              Tra una sfilata e l’altra, prenditi il tempo per passeggiare nel centro storico: Piazza Duomo con la
              cattedrale in stile gotico lombardo, le vie porticate e i palazzi del centro. Poco fuori città c’è il
              santuario di Santa Maria della Croce.
            </p>
            <p className={`${styles.copy} ${styles.muted}`}>
              [Testo da completare con i luoghi consigliati dalla Pro Loco.]
            </p>
            <p>
              <MoreLink href={turismoHref} label="Scopri le proposte della Pro Loco" />
            </p>
          </Stack>
          <PhotoGrid items={cremaPhotos} />
        </div>
      </Section>
    </>
  );
}
