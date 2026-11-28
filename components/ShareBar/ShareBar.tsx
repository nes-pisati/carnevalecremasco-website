"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/Icon/Icon";
import { Label } from "@/components/Label/Label";
import styles from "./ShareBar.module.css";

const COPY_FEEDBACK_MS = 3000;

type CopyState = "idle" | "copied" | "failed";

type ShareTarget = {
  label: string;
  icon: IconName;
  shareUrl: (pageUrl: string, title: string) => string;
};

const shareTargets: ShareTarget[] = [
  {
    label: "WhatsApp",
    icon: "chat",
    shareUrl: (pageUrl, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${pageUrl}`)}`,
  },
  {
    label: "Facebook",
    icon: "fb",
    shareUrl: (pageUrl) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
  },
];

const copyLabels: Record<CopyState, string> = {
  idle: "Copia link",
  copied: "Link copiato",
  failed: "Copia non riuscita",
};

const copyAnnouncements: Record<CopyState, string> = {
  idle: "",
  copied: "Link copiato negli appunti",
  failed: "Non è stato possibile copiare il link",
};

export function ShareBar({ title }: { title: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  useEffect(() => {
    if (copyState === "idle") return;
    const timeout = window.setTimeout(() => setCopyState("idle"), COPY_FEEDBACK_MS);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  function share(target: ShareTarget) {
    window.open(target.shareUrl(window.location.href, title), "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <aside className={styles.side} aria-label="Condividi">
      <Label as="p">Condividi</Label>
      <ul role="list" className={styles.list}>
        {shareTargets.map((target) => (
          <li key={target.label}>
            <button type="button" className={styles.button} onClick={() => share(target)}>
              <Icon name={target.icon} size={20} />
              {target.label}
              <span className="visually-hidden"> (si apre in una nuova finestra)</span>
            </button>
          </li>
        ))}
        <li>
          <button type="button" className={styles.button} onClick={copyLink}>
            <Icon name={copyState === "copied" ? "check" : "link"} size={20} />
            {copyLabels[copyState]}
          </button>
        </li>
      </ul>
      <p role="status" className="visually-hidden">
        {copyAnnouncements[copyState]}
      </p>
    </aside>
  );
}
