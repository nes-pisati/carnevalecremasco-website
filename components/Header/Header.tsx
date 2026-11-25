import { Logo } from "@/components/Logo/Logo";
import { getSiteSettings } from "@/lib/wp/site";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

export async function Header() {
  const { socialLinks } = await getSiteSettings();

  return (
    <header className={styles.header}>
      <div className={styles.desktopBar}>
        <Logo />
        <DesktopNav />
      </div>
      <div className={styles.mobileBar}>
        <Logo />
        <MobileMenu socialLinks={socialLinks} />
      </div>
    </header>
  );
}
