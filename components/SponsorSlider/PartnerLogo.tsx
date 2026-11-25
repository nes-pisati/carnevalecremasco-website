import Image from "next/image";
import type { Partner } from "@/lib/wp/types";
import styles from "./SponsorSlider.module.css";

function LogoContent({ partner }: { partner: Partner }) {
  if (partner.logo.file) {
    return (
      <Image
        className={styles.logoImage}
        src={partner.logo.file.url}
        width={partner.logo.file.width}
        height={partner.logo.file.height}
        alt={partner.logo.alt}
        loading="lazy"
      />
    );
  }
  return (
    <span role="img" aria-label={partner.logo.alt} className={styles.logoPlaceholder}>
      <b className={styles.logoName}>{partner.name}</b>
    </span>
  );
}

export function PartnerLogo({ partner }: { partner: Partner }) {
  if (partner.url) {
    return (
      <a href={partner.url} className={styles.logo}>
        <LogoContent partner={partner} />
      </a>
    );
  }
  return (
    <span className={styles.logo}>
      <LogoContent partner={partner} />
    </span>
  );
}
