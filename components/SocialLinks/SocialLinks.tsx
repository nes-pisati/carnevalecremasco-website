import { Icon } from "@/components/Icon/Icon";
import { socialIcons } from "@/lib/navigation";
import type { SocialLink } from "@/lib/wp/types";
import styles from "./SocialLinks.module.css";

type SocialLinksProps = {
  links: SocialLink[];
  tone?: "light" | "dark";
};

export function SocialLinks({ links, tone = "light" }: SocialLinksProps) {
  return (
    <ul role="list" className={`${styles.list} ${styles[tone]}`}>
      {links.map((link) => (
        <li key={link.network}>
          <a className={styles.link} href={link.url}>
            <Icon name={socialIcons[link.network]} size={20} />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
