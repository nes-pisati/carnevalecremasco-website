import { buttonClassName, type ButtonVariant } from "@/components/Button/Button";
import { Icon, type IconName } from "@/components/Icon/Icon";
import { toTelHref } from "@/lib/phone";
import styles from "./ContactLink.module.css";

export type ContactKind = "email" | "phone";

const CONTACT_ICONS: Record<ContactKind, IconName> = {
  email: "mail",
  phone: "phone",
};

function contactHref(kind: ContactKind, value: string): string {
  return kind === "email" ? `mailto:${value}` : toTelHref(value);
}

type ContactLinkProps = {
  kind: ContactKind;
  value: string;
  appearance?: "pill" | ButtonVariant;
};

export function ContactLink({ kind, value, appearance = "pill" }: ContactLinkProps) {
  const isPill = appearance === "pill";
  const className = isPill ? styles.pill : buttonClassName(appearance);
  const content = (
    <>
      {isPill ? (
        <span className={styles.disc}>
          <Icon name={CONTACT_ICONS[kind]} size={18} />
        </span>
      ) : (
        <Icon name={CONTACT_ICONS[kind]} size={20} />
      )}
      {value}
    </>
  );

  return (
    <a href={contactHref(kind, value)} className={className}>
      {content}
    </a>
  );
}
