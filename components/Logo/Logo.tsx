import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import styles from "./Logo.module.css";

export const LOGO_SRC = "/images/carnevale-cremasco-logo.jpg";
const LOGO_WIDTH = 600;
const LOGO_HEIGHT = 444;

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href={routes.home}
      className={[styles.plate, className].filter(Boolean).join(" ")}
      aria-label="Carnevale Cremasco, homepage"
    >
      <Image
        className={styles.image}
        src={LOGO_SRC}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        alt="Carnevale Cremasco"
        loading="eager"
      />
    </Link>
  );
}
