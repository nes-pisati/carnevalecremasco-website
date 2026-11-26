import { Icon } from "@/components/Icon/Icon";
import { MoreLink } from "@/components/MoreLink/MoreLink";
import { Photo, type PhotoPlaceholderColor } from "@/components/Photo/Photo";
import { toTelHref } from "@/lib/phone";
import type { Agreement } from "@/lib/wp/types";
import styles from "./PlaceCard.module.css";

type PlaceCardProps = {
  place: Agreement;
  placeholderColor: PhotoPlaceholderColor;
  sizes: string;
};

export function PlaceCard({ place, placeholderColor, sizes }: PlaceCardProps) {
  return (
    <article className={styles.card}>
      <Photo className={styles.photo} photo={place.photo} placeholderColor={placeholderColor} sizes={sizes} />
      <div className={styles.body}>
        <h3 className={styles.name}>{place.name}</h3>
        <p className={styles.line}>
          <Icon name="pin" size={20} className={styles.icon} />
          <span>
            <span className="visually-hidden">Indirizzo: </span>
            {place.address}
          </span>
        </p>
        <p className={styles.line}>
          <Icon name="phone" size={20} className={styles.icon} />
          {place.phone ? (
            <a href={toTelHref(place.phone)} className={styles.phone}>
              <span className="visually-hidden">Telefono: </span>
              {place.phone}
            </a>
          ) : (
            <span>
              <span className="visually-hidden">Telefono: </span>
              [telefono]
            </span>
          )}
        </p>
        {place.mapsUrl && (
          <p>
            <MoreLink href={place.mapsUrl} label="Indicazioni" />
          </p>
        )}
      </div>
    </article>
  );
}
