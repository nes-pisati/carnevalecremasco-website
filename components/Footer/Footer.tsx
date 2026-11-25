import Link from "next/link";
import { footerColumns } from "@/lib/navigation";
import { toTelHref } from "@/lib/phone";
import { routes } from "@/lib/routes";
import { getSiteSettings } from "@/lib/wp/site";
import styles from "./Footer.module.css";

export async function Footer() {
  const site = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.sign}>
          <p className={styles.greeting}>
            Ci vediamo
            <br />
            al <span className={styles.accent}>Carnevale</span>!
          </p>
          <address className={styles.address}>
            {site.organizationName}
            {site.addressLines.map((line) => (
              <span key={line}>
                <br />
                {line}
              </span>
            ))}
            <br />
            Tel. <a href={toTelHref(site.phone)}>{site.phone}</a>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </address>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className={styles.column}>
            <h2 className={styles.columnTitle}>{column.title}</h2>
            <ul role="list" className={styles.columnList}>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Social</h2>
          <ul role="list" className={styles.columnList}>
            {site.socialLinks.map((link) => (
              <li key={link.network}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.legal}>
        <span>
          © {year} {site.organizationName}
        </span>
        <Link className={styles.legalLink} href={routes.privacy}>
          Privacy Policy
        </Link>
        <Link className={styles.legalLink} href={routes.cookiePolicy}>
          Cookie Policy
        </Link>
        <button type="button" className={styles.legalButton}>
          Preferenze cookie
        </button>
      </div>
    </footer>
  );
}
