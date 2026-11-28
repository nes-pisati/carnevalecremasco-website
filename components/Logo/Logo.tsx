import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import styles from "./Logo.module.css";

export const LOGO_SRC = "/images/carnevale-cremasco-logo-320.jpg";
const LOGO_WIDTH = 320;
const LOGO_HEIGHT = 237;

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
