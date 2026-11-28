import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery/Gallery";
import { InviteBox } from "@/components/InviteBox/InviteBox";
import { PageHead } from "@/components/PageHead/PageHead";
import { Section } from "@/components/Section/Section";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { fotoSections, routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { getGalleries } from "@/lib/wp/galleries";
import { getSiteSettings } from "@/lib/wp/site";
import styles from "./page.module.css";

const GALLERY_PAGE_SIZE = 10;

export const metadata: Metadata = pageMetadata({
  title: "Foto",
  description:
    "Le immagini più belle delle sfilate: carri, maschere, bande e il pubblico delle domeniche di Carnevale.",
  path: routes.foto,
});

export default async function FotoPage() {
  const [galleries, site] = await Promise.all([getGalleries(), getSiteSettings()]);
  const gallery = galleries.find((item) => item.editionYear !== null && item.photos.length > 0);

  return (
    <>
      <PageHead
        breadcrumb={[{ label: "Home", href: routes.home }, { label: "Il Carnevale" }]}
        title="Foto"
        lead="Le immagini più belle delle sfilate: carri, maschere, bande e il pubblico delle domeniche di Carnevale."
      />

      {gallery && (
        <Section id={fotoSections.foto} aria-labelledby="foto-title" className={styles.gallery}>
          <Gallery
            titleId="foto-title"
            title="Foto"
            subtitle="Tocca una foto per aprirla a tutto schermo"
            photos={gallery.photos}
            credit={gallery.credit}
            pageSize={GALLERY_PAGE_SIZE}
          />
        </Section>
      )}

      <Section id={fotoSections.seguici} end>
        <InviteBox
          color="raised"
          discColor="red"
          title="Seguici"
          titleAs="h2"
          actions={<SocialLinks links={site.socialLinks} tone="surface" />}
        >
          <p className={styles.muted}>Foto e dietro le quinte dei carri durante tutto l’anno.</p>
        </InviteBox>
      </Section>
    </>
  );
}
