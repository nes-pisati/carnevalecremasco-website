import type { ReactNode } from "react";
import { buttonClassName, type ButtonVariant } from "@/components/Button/Button";
import { Icon, type IconName } from "@/components/Icon/Icon";
import { googleMapsSearchUrl } from "@/lib/maps";
import { toTelHref } from "@/lib/phone";
import styles from "./ContactLink.module.css";

export type ContactKind = "email" | "phone" | "address";

const CONTACT_ICONS: Record<ContactKind, IconName> = {
  email: "mail",
  phone: "phone",
  address: "pin",
};

const CONTACT_PLACEHOLDERS: Record<ContactKind, string> = {
  email: "[email]",
  phone: "[telefono]",
  address: "[indirizzo]",
};

function contactHref(kind: ContactKind, value: string): string {
  if (kind === "email") return `mailto:${value}`;
  if (kind === "phone") return toTelHref(value);
  return googleMapsSearchUrl(value);
}

function withEmailBreak(text: string): ReactNode {
  const at = text.indexOf("@");
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at + 1)}
      <wbr />
      {text.slice(at + 1)}
    </>
  );
}

function displayText(kind: ContactKind, value: string | null, label?: string): ReactNode {
  if (!value) return CONTACT_PLACEHOLDERS[kind];
  if (label) return label;
  return kind === "email" ? withEmailBreak(value) : value;
}

type ContactLinkProps = {
  kind: ContactKind;
  value: string | null;
  label?: string;
  appearance?: "pill" | ButtonVariant;
};

export function ContactLink({ kind, value, label, appearance = "pill" }: ContactLinkProps) {
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
      <span>{displayText(kind, value, label)}</span>
    </>
  );

  if (!value) {
    return <span className={className}>{content}</span>;
  }

  return (
    <a href={contactHref(kind, value)} className={className}>
      {content}
    </a>
  );
}
