import Link from "next/link";
import { BulletList } from "@/components/BulletList/BulletList";
import { Fact, FactList } from "@/components/FactList/FactList";
import { fillClass, type AccentColor } from "@/components/fills";
import { Pill } from "@/components/Pill/Pill";
import { Tag } from "@/components/Tag/Tag";
import { capitalize, formatDayOfMonth, formatMonthYear, formatTimeRange, formatWeekday } from "@/lib/format";
import { eventAnchor } from "@/lib/wp/events";
import type { CarnivalEvent, CarnivalEventKind } from "@/lib/wp/types";
import styles from "./DayCard.module.css";

const KIND_LABELS: Record<CarnivalEventKind, string> = {
  opening: "Festa d’apertura",
  parade: "Corso mascherato",
  finale: "Gran finale",
};

type DayCardProps = {
  event: CarnivalEvent;
  color: AccentColor;
  ticketsHref: string;
};

export function DayCard({ event, color, ticketsHref }: DayCardProps) {
  const anchor = eventAnchor(event);
  const titleId = `${anchor}-title`;

  return (
    <section id={anchor} className={styles.day} aria-labelledby={titleId}>
      <div className={`${styles.date} ${fillClass(color)}`}>
        <span className={styles.weekday}>{formatWeekday(event.date)}</span>
        <time dateTime={event.date} className={styles.when}>
          <span className={styles.number}>{formatDayOfMonth(event.date)}</span>
          <span className={styles.month}>{formatMonthYear(event.date)}</span>
        </time>
        <Pill>{KIND_LABELS[event.kind]}</Pill>
      </div>
      <div className={styles.body}>
        <h2 id={titleId} className={styles.title}>
          {event.title}
        </h2>
        {event.note && <Tag color="cream">{event.note}</Tag>}
        <FactList>
          <Fact icon="clock" label="Orario">
            {capitalize(formatTimeRange(event.time))}
          </Fact>
          <Fact icon="pin" label="Luogo">
            {event.place}
          </Fact>
          <Fact icon="ticket" label="Ingresso">
            {event.isFree ? (
              "Gratuito"
            ) : (
              <>
                A pagamento · <Link href={ticketsHref}>Biglietti</Link>
              </>
            )}
          </Fact>
          <Fact icon="store" label="Mercatini">
            {event.market ? `Sì, ${event.market.place}, ${formatTimeRange(event.market.time)}` : "No"}
          </Fact>
        </FactList>
        {event.highlights.length > 0 && <BulletList title="Cosa c’è" items={event.highlights} />}
      </div>
    </section>
  );
}
