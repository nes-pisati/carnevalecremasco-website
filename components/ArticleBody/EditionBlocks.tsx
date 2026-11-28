import { Band } from "@/components/Band/Band";
import { CarroGrid } from "@/components/CarroCard/CarroCard";
import { PhotoBento } from "@/components/PhotoBento/PhotoBento";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { routes } from "@/lib/routes";
import { getFloats } from "@/lib/wp/floats";
import { featuredPhotos, getEditionGallery } from "@/lib/wp/galleries";
import styles from "./EditionBlocks.module.css";

type EditionBlockProps = {
  editionYear: number;
};

function floatRankingAnchor(editionYear: number): string {
  return `classifica-${editionYear}`;
}

export async function FloatRankingBlock({ editionYear }: EditionBlockProps) {
  const floats = await getFloats(editionYear);
  if (floats.length === 0) return null;

  const anchor = floatRankingAnchor(editionYear);
  const titleId = `${anchor}-title`;

  return (
    <Section id={anchor} aria-labelledby={titleId} className={styles.anchored}>
      <SectionHeader
        titleId={titleId}
        title="Classifica dei carri"
        subtitle="Tutti i carri in gara, con i voti della giuria popolare"
      />
      <CarroGrid floats={floats} />
    </Section>
  );
}

export async function EditionGalleryBlock({ editionYear }: EditionBlockProps) {
  const gallery = await getEditionGallery(editionYear);
  const photos = gallery ? featuredPhotos(gallery) : [];
  if (!gallery || photos.length === 0) return null;

  const titleId = `galleria-${editionYear}-title`;

  return (
    <Band aria-labelledby={titleId}>
      <SectionHeader
        titleId={titleId}
        title={`Galleria dell’edizione ${editionYear}`}
        subtitle={gallery.credit ? `Foto di ${gallery.credit}` : undefined}
        link={{ href: routes.foto, label: "Tutte le foto" }}
        tone="dark"
      />
      <PhotoBento photos={photos} />
    </Band>
  );
}
