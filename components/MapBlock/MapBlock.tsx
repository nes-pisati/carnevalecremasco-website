import { Button } from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import styles from "./MapBlock.module.css";

type MapBlockProps = {
  mapsUrl: string;
};

export function MapBlock({ mapsUrl }: MapBlockProps) {
  return (
    <div className={`${styles.map} ${styles.offMap}`}>
      <div className={styles.off}>
        <div className={styles.offCard}>
          <Label>Mappa disattivata</Label>
          <p className={styles.offText}>
            Per vedere la mappa di Google serve il consenso ai cookie di terze parti. Puoi aprirla direttamente su
            Google Maps.
          </p>
          <div className={styles.actions}>
            <Button href={mapsUrl} icon="ext">
              Apri in Google Maps
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
