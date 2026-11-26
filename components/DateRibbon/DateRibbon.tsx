import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { cycleAccent, fillClass } from "@/components/fills";
import { formatDayOfMonth, formatMonthShort, formatTimeRange } from "@/lib/format";
import { routes, withAnchor } from "@/lib/routes";
import { eventAnchor } from "@/lib/wp/events";
import type { CarnivalEvent } from "@/lib/wp/types";
import styles from "./DateRibbon.module.css";

type DateRibbonProps = {
  events: CarnivalEvent[];
  label: string;
  variant?: "band" | "panel";
};

function eventDetails(event: CarnivalEvent): string {
  const details = [event.place, formatTimeRange(event.time)];
  if (event.isFree) details.push("ingresso gratuito");
  return details.join(" · ");
}

export function DateRibbon({ events, label, variant = "band" }: DateRibbonProps) {
  const ribbon = (
    <nav className={styles.ribbon} aria-label={label}>
      <ul role="list" className={styles.list}>
        {events.map((event, index) => (
          <li key={event.date}>
            <Link href={withAnchor(routes.programma, eventAnchor(event))} className={styles.date}>
              <time dateTime={event.date} className={`${styles.disc} ${fillClass(cycleAccent(index))}`}>
                <span className={styles.day}>{formatDayOfMonth(event.date)}</span>
                <span className={styles.month}>{formatMonthShort(event.date)}</span>
              </time>
              <span className={styles.text}>
                <span className={styles.label}>{event.title}</span>
                <span className={styles.note}>{eventDetails(event)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      </nav>
  );

  if (variant === "panel") {
    return (
      <Container>
        <div className={`${styles.band} ${styles.panel}`}>{ribbon}</div>
      </Container>
    );
  }

  return <div className={styles.band}>{ribbon}</div>;
}
