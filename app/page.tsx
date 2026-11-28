import { Accent } from "@/components/Accent/Accent";
import { Band } from "@/components/Band/Band";
import { Button } from "@/components/Button/Button";
import { CarroScroller } from "@/components/CarroCard/CarroCard";
import { DateRibbon } from "@/components/DateRibbon/DateRibbon";
import { FeaturePanel, StatGrid } from "@/components/FeaturePanel/FeaturePanel";
import { Hero } from "@/components/Hero/Hero";
import { InfoCardGrid } from "@/components/InfoCard/InfoCard";
import { NewsGrid } from "@/components/NewsCard/NewsCard";
import { PhotoBento } from "@/components/PhotoBento/PhotoBento";
import { Pill } from "@/components/Pill/Pill";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { PartnerLogo } from "@/components/SponsorSlider/PartnerLogo";
import { SponsorSlider } from "@/components/SponsorSlider/SponsorSlider";
import { Stat } from "@/components/Stat/Stat";
import { formatMonthsSpan, formatOrdinal } from "@/lib/format";
import { informazioniSections, routes, withAnchor } from "@/lib/routes";
import { visitInfoCards } from "@/lib/visitInfo";
import { getCurrentEdition } from "@/lib/wp/editions";
import { getEvents } from "@/lib/wp/events";
import { getFloats, getLatestRankedEditionYear } from "@/lib/wp/floats";
import { featuredPhotos, getGalleries } from "@/lib/wp/galleries";
import { getLatestNews } from "@/lib/wp/news";
import { getPartners } from "@/lib/wp/partners";

const HOME_FLOATS_COUNT = 5;
const HOME_NEWS_COUNT = 3;

export default async function Home() {
  const edition = await getCurrentEdition();
  const events = await getEvents(edition.year);
  const period = formatMonthsSpan(events.map((event) => event.date));
  const rankedYear = await getLatestRankedEditionYear();
  const floats = rankedYear === null ? [] : (await getFloats(rankedYear)).slice(0, HOME_FLOATS_COUNT);
  const [latestGallery] = (await getGalleries()).filter((gallery) => gallery.editionYear !== null);
  const bentoPhotos = latestGallery ? featuredPhotos(latestGallery) : [];
  const news = await getLatestNews(HOME_NEWS_COUNT);
  const partners = await getPartners();

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

      {floats.length > 0 && (
        <Section aria-labelledby="carri-title">
          <SectionHeader
            titleId="carri-title"
            title={`I carri del ${rankedYear}`}
            subtitle="La classifica della giuria popolare"
          />
          <CarroScroller floats={floats} labelledBy="carri-title" />
        </Section>
      )}

      {bentoPhotos.length > 0 && (
        <Band aria-labelledby="foto-title">
          <SectionHeader
            titleId="foto-title"
            title="Foto"
            subtitle="Le domeniche di festa in piazza"
            link={{ href: routes.foto, label: "Tutte le foto" }}
            tone="dark"
          />
          <PhotoBento photos={bentoPhotos} />
        </Band>
      )}

      {news.length > 0 && (
        <Section aria-labelledby="news-title">
          <SectionHeader
            titleId="news-title"
            title="Ultime news"
            link={{ href: routes.news, label: "Tutte le news" }}
          />
          <NewsGrid articles={news} />
        </Section>
      )}

      {partners.length > 0 && (
        <Section aria-roledescription="carosello" aria-label="Sponsor">
          <SponsorSlider
            label="Con il sostegno di"
            items={partners.map((partner) => ({ key: partner.name, content: <PartnerLogo partner={partner} /> }))}
          />
        </Section>
      )}
    </>
  );
}
