import Link from "next/link";
import { cycleAccent, fillClass } from "@/components/fills";
import { formatDayOfMonth, formatMonthShort, formatTimeRange } from "@/lib/format";
import { routes, withAnchor } from "@/lib/routes";
import { eventAnchor } from "@/lib/wp/events";
import type { CarnivalEvent } from "@/lib/wp/types";
import styles from "./DateRibbon.module.css";

type DateRibbonProps = {
  events: CarnivalEvent[];
  label: string;
};

function eventDetails(event: CarnivalEvent): string {
  const details = [event.place, formatTimeRange(event.time)];
  if (event.isFree) details.push("ingresso gratuito");
  return details.join(" · ");
}

export function DateRibbon({ events, label }: DateRibbonProps) {
  return (
    <div className={styles.band}>
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
    </div>
  );
}
