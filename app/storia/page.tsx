import type { Metadata } from "next";
// import { Attachment } from "@/components/Attachment/Attachment";
import { Band } from "@/components/Band/Band";
import { CaptionedPhoto } from "@/components/CaptionedPhoto/CaptionedPhoto";
import { Chapter, ChapterText } from "@/components/Chapter/Chapter";
import { ChapterIndex, type ChapterIndexItem } from "@/components/ChapterIndex/ChapterIndex";
import { ContactLink } from "@/components/ContactLink/ContactLink";
import { InviteBox } from "@/components/InviteBox/InviteBox";
import { PageHead } from "@/components/PageHead/PageHead";
import { Photo } from "@/components/Photo/Photo";
import { Pill } from "@/components/Pill/Pill";
import { Quote } from "@/components/Quote/Quote";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { StepCardGrid, type StepCardItem } from "@/components/StepCard/StepCard";
import { Stat } from "@/components/Stat/Stat";
import { formatOrdinal } from "@/lib/format";
import { routes, storiaSections } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { getCurrentEdition } from "@/lib/wp/editions";
import { getSiteSettings } from "@/lib/wp/site";
import styles from "./page.module.css";

const CHAPTER_PHOTO_SIZES = "(min-width: 901px) 60vw, 100vw";

const chapterIndex: ChapterIndexItem[] = [
  { id: storiaSections.origini, label: "Le origini" },
  { id: storiaSections.rinascita, label: "La rinascita" },
  { id: storiaSections.anniRuggenti, label: "Gli anni ruggenti" },
  { id: storiaSections.riflusso, label: "Il riflusso" },
  { id: storiaSections.oggi, label: "Il Carnevale di oggi" },
  { id: storiaSections.gaget, label: "La maschera del Gagèt" },
  { id: storiaSections.carri, label: "I carri" },
];

const floatSteps: StepCardItem[] = [
  {
    title: "I gruppi del territorio",
    text: "Associazioni, oratori e compagnie di amici progettano il carro e lavorano per mesi nei capannoni.",
    color: "red",
  },
  {
    title: "La cartapesta",
    text: "Strutture, figure e mascheroni sono modellati e dipinti a mano, strato dopo strato.",
    color: "blue",
  },
  {
    title: "Le scuole",
    text: "Anche gli istituti scolastici partecipano con i loro carri.",
    color: "sky",
  },
  {
    title: "Il voto del pubblico",
    text: "La giuria popolare vota con il QR code: il carro più votato diventa Re Carnevale.",
    color: "pink",
    icon: "qr",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Storia del Carnevale",
  description:
    "Dalle feste in maschera della Serenissima ai carri di cartapesta di oggi: la storia del Carnevale Cremasco e della maschera del Gagèt.",
  path: routes.storia,
});

export default async function StoriaPage() {
  const [edition, site] = await Promise.all([getCurrentEdition(), getSiteSettings()]);

  return (
    <>
      <PageHead
        breadcrumb={[{ label: "Home", href: routes.home }, { label: "Il Carnevale" }]}
        title="Il più grande carnevale della Lombardia"
        lead="Dalle feste in maschera della Serenissima ai carri di cartapesta di oggi: la storia di una festa fatta dalla città, per la città."
      >
        <div className={styles.stats}>
          <Stat value="1953" label="la rinascita con il comitato “Pro Crema”" tone="blue" />
          <Stat
            value={formatOrdinal(edition.number, "feminine")}
            label={`edizione nel ${edition.year}`}
            tone="red"
          />
        </div>
      </PageHead>

      <Section as="div">
        <div className={styles.chapters}>
          <ChapterIndex items={chapterIndex} label="Capitoli" />
          <div>
            <Chapter id={storiaSections.origini} number={1} title="Le origini" era="XV secolo" eraColor="red">
              <ChapterText>
                Le prime feste di Carnevale a Crema risalgono al XV secolo, quando la città era sotto la Serenissima
                Repubblica di Venezia. Maschere, balli e cortei animavano le piazze del centro nei giorni che
                precedevano la Quaresima.
              </ChapterText>
              <ChapterText muted>[Approfondimento sulle fonti storiche da completare.]</ChapterText>
              <CaptionedPhoto
                photo={{ alt: "Stampa d’epoca: festa in maschera in piazza", file: null }}
                caption="Stampa d’epoca: festa in maschera in piazza"
                placeholderColor="cream"
                sizes={CHAPTER_PHOTO_SIZES}
              />
            </Chapter>

            <Chapter id={storiaSections.rinascita} number={2} title="La rinascita" era="1953" eraColor="blue">
              <ChapterText>
                Nel 1953 il comitato “Pro Crema” riporta il Carnevale in città con i primi corsi mascherati del
                dopoguerra. Da qui nasce la tradizione dei carri allegorici costruiti dai gruppi del territorio.
              </ChapterText>
              <CaptionedPhoto
                photo={{ alt: "Foto d’epoca: uno dei primi carri allegorici [anno]", file: null }}
                caption="Foto d’epoca: uno dei primi carri allegorici [anno]"
                placeholderColor="sky"
                sizes={CHAPTER_PHOTO_SIZES}
              />
              <Quote
                text="[Citazione di un protagonista della rinascita del Carnevale.]"
                citation="[Nome, ruolo, anno]"
              />
            </Chapter>

            <Chapter
              id={storiaSections.anniRuggenti}
              number={3}
              title="Gli anni ruggenti"
              era="[decennio]"
              eraColor="sky"
            >
              <ChapterText>
                [Testo da completare: gli anni di maggiore partecipazione, i carri più ricordati, il pubblico che
                arriva da tutta la Lombardia.]
              </ChapterText>
            </Chapter>

            <Chapter id={storiaSections.riflusso} number={4} title="Il riflusso" era="[decennio]" eraColor="pink">
              <ChapterText>[Testo da completare: gli anni più difficili e le edizioni sospese.]</ChapterText>
            </Chapter>

            <Chapter
              id={storiaSections.oggi}
              number={5}
              title="Il Carnevale di oggi"
              era={site.organizationName}
              eraColor="cream"
            >
              <ChapterText>
                Oggi il Carnevale è organizzato dall’associazione {site.organizationName}, con circa 200 volontari.
                Ogni domenica di sfilata porta in centro oltre 10mila persone, e il Re Carnevale lo sceglie il
                pubblico con il voto via QR code.
              </ChapterText>
              <CaptionedPhoto
                photo={{ alt: "Foto: la premiazione del Re Carnevale 2026", file: null }}
                caption="Foto: la premiazione del Re Carnevale 2026"
                placeholderColor="red"
                sizes={CHAPTER_PHOTO_SIZES}
              />
            </Chapter>
          </div>
        </div>
      </Section>

      <Band id={storiaSections.gaget} aria-labelledby="gaget-title" className={styles.gagetBand}>
        <div className={styles.gaget}>
          <div className={styles.gagetArt}>
            <Photo
              photo={{ alt: "Foto: il Gagèt con l’oca sottobraccio in testa alla sfilata", file: null }}
              placeholderColor="periwinkle"
              sizes="(min-width: 901px) 50vw, 100vw"
              className={styles.gagetPhoto}
            />
            <span className={styles.gagetDisc} aria-hidden="true" />
          </div>
          <div className={styles.gagetText}>
            <h2 id="gaget-title" className={styles.gagetLabel}>
              La maschera del Gagèt
            </h2>
            <p className={styles.dialect} lang="lmo">
              Al Gagèt còl sò Uchèt
            </p>
            <p className={styles.gagetCopy}>
              Scelto nel 1955 come maschera ufficiale della città, il Gagèt è un contadino in abito nero, con calze
              vistose, cappellaccio, guanti bianchi e bastoncino. Sottobraccio tiene la sua oca, l’Uchèt.
            </p>
            <p className={styles.gagetCopy}>È lui ad aprire ogni sfilata, salutando il pubblico lungo il percorso.</p>
            <p className={styles.pills}>
              <Pill>Dal 1955</Pill>
              <Pill tone="pink">Apre ogni sfilata</Pill>
            </p>
          </div>
        </div>
      </Band>

      <Section id={storiaSections.carri} aria-labelledby="carri-title">
        <SectionHeader titleId="carri-title" title="I carri" subtitle="Come nasce un carro allegorico" />
        <StepCardGrid items={floatSteps} />
      </Section>

      <Section end>
        {/*
        <SectionHeader title="Approfondimenti" />
        <Attachment
          title="“Piovono coriandoli”"
          description="Tesina sulla storia del Carnevale Cremasco"
          url="/documenti/piovono-coriandoli.pdf"
          fileType="PDF"
          sizeInBytes={null}
        />
        */}
        <div className={styles.invite}>
          <InviteBox
            color="cream"
            discColor="pink"
            title="Vuoi fare il Gagèt?"
            titleAs="h2"
            actions={<ContactLink kind="phone" value={site.phone} appearance="primary" />}
          >
            <p>Ogni anno cerchiamo chi indossi la maschera della città. Se ti piacerebbe, chiamaci per conoscerci.</p>
          </InviteBox>
        </div>
      </Section>
    </>
  );
}
