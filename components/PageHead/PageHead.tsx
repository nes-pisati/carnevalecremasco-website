import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/Container/Container";
import styles from "./PageHead.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

type PageHeadProps = {
  breadcrumb?: BreadcrumbItem[];
  badges?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
};

function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Percorso">
      <ol role="list" className={styles.crumb}>
        {items.map((item, index) => (
          <li key={item.label} className={styles.crumbItem}>
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} aria-current={item.current ? "page" : undefined}>
                {item.label}
              </Link>
            ) : (
              <span aria-current={item.current ? "page" : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHead({ breadcrumb, badges, title, lead, children }: PageHeadProps) {
  return (
    <Container>
      <div className={styles.head}>
        <div className={styles.art} aria-hidden="true">
          <span className={styles.disc} />
          <span className={styles.half} />
          <span className={styles.tile} />
        </div>
        <div className={styles.copy}>
          {breadcrumb && breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
          {badges && <p className={styles.row}>{badges}</p>}
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
        </div>
        {children && <div className={styles.extra}>{children}</div>}
      </div>
    </Container>
  );
}
