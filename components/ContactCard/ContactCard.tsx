import { Card } from "@/components/Card/Card";
import { ContactLink, type ContactKind } from "@/components/ContactLink/ContactLink";
import { fillClass, type AccentColor } from "@/components/fills";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./ContactCard.module.css";

export type ContactEntry = {
  kind: ContactKind;
  value: string | null;
  label?: string;
};

type ContactCardProps = {
  icon: IconName;
  color: AccentColor;
  title: string;
  contactPerson: string;
  contacts: ContactEntry[];
};

export function ContactCard({ icon, color, title, contactPerson, contacts }: ContactCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.head}>
        <span className={`${styles.disc} ${fillClass(color)}`} aria-hidden="true">
          <Icon name={icon} />
        </span>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.person}>{contactPerson}</p>
        </div>
      </div>
      <ul role="list" className={styles.links}>
        {contacts.map((contact) => (
          <li key={contact.kind}>
            <ContactLink kind={contact.kind} value={contact.value} label={contact.label} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
