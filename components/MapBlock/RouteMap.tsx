import type { CSSProperties } from "react";
import { fillClass, type AccentColor } from "@/components/fills";
import styles from "./MapBlock.module.css";

export type MapPin = {
  mark: string;
  label: string;
  color: AccentColor | "ink";
  x: number;
  y: number;
};

type RouteMapProps = {
  label: string;
  pins: MapPin[];
  tag?: string;
};

const ROUTE_PATH = "M90 330 C 90 170, 190 90, 320 90 S 520 150, 510 260 S 380 380, 250 360 S 90 380, 90 330 Z";

function pinStyle(pin: MapPin): CSSProperties {
  return { "--pin-x": `${pin.x}%`, "--pin-y": `${pin.y}%` } as CSSProperties;
}

export function RouteMap({ label, pins, tag }: RouteMapProps) {
  return (
    <div className={`${styles.map} ${styles.routeMap}`} role="img" aria-label={label}>
      <svg className={styles.route} aria-hidden="true" viewBox="0 0 600 440" preserveAspectRatio="none">
        <path d={ROUTE_PATH} className={styles.routeRoad} />
        <path d={ROUTE_PATH} className={styles.routeDots} />
      </svg>
      {pins.map((pin) => (
        <span key={pin.mark} className={styles.pin} style={pinStyle(pin)}>
          <i className={`${styles.pinMark} ${pin.color === "ink" ? styles.ink : fillClass(pin.color)}`}>{pin.mark}</i>
          {pin.label}
        </span>
      ))}
      {tag && <span className={styles.tag}>{tag}</span>}
    </div>
  );
}
