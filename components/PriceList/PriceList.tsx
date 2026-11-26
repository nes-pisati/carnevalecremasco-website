import { cycleFill, fillClass } from "@/components/fills";
import { formatPrice } from "@/lib/format";
import type { TicketPrice } from "@/lib/wp/types";
import styles from "./PriceList.module.css";

type PriceListProps = {
  prices: TicketPrice[];
  caption: string;
};

export function PriceList({ prices, caption }: PriceListProps) {
  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <caption className="visually-hidden">{caption}</caption>
        <tbody>
          {prices.map((price, index) => (
            <tr key={price.label} className={styles.row}>
              <th scope="row" className={styles.name}>
                <span className={styles.nameInner}>
                  <span className={`${styles.dot} ${fillClass(cycleFill(index))}`} aria-hidden="true" />
                  <span className={styles.label}>
                    {price.label}
                    {price.detail && <span className={styles.detail}>{price.detail}</span>}
                  </span>
                </span>
              </th>
              <td className={styles.value}>{formatPrice(price.priceInEuro)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
