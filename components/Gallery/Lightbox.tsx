"use client";

import { useEffect, useRef, type KeyboardEvent, type TouchEvent } from "react";
import { buttonClassName } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Photo, cyclePlaceholder } from "@/components/Photo/Photo";
import type { GalleryPhoto } from "@/lib/wp/types";
import styles from "./Lightbox.module.css";

const SWIPE_THRESHOLD = 50;

type LightboxProps = {
  photos: GalleryPhoto[];
  credit: string | null;
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

function photoMeta(photo: GalleryPhoto, credit: string | null): string {
  return [photo.eventLabel, credit && `Foto di ${credit}`].filter(Boolean).join(" · ");
}

export function Lightbox({ photos, credit, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null;
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function step(offset: number) {
    if (index === null) return;
    onIndexChange((index + offset + photos.length) % photos.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined) return;
    const distance = endX - startX;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) step(distance < 0 ? 1 : -1);
  }

  const meta = photo ? photoMeta(photo, credit) : "";

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Galleria foto a tutto schermo"
      onClose={onClose}
      onKeyDown={handleKeyDown}
    >
      {photo && index !== null && (
        <>
          <div className={styles.bar}>
            <p className={styles.counter} aria-live="polite">
              Foto {index + 1} di {photos.length}
            </p>
            <button
              type="button"
              className={styles.control}
              aria-label="Chiudi la galleria"
              onClick={() => dialogRef.current?.close()}
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <div className={styles.stage} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {photos.length > 1 && (
              <button
                type="button"
                className={`${styles.control} ${styles.previous}`}
                aria-label="Foto precedente"
                onClick={() => step(-1)}
              >
                <Icon name="left" size={24} />
              </button>
            )}
            <Photo
              key={index}
              className={styles.media}
              photo={photo}
              placeholderColor={photo.file ? "ink" : cyclePlaceholder(index)}
              sizes="100vw"
              fit="contain"
            />
            {photos.length > 1 && (
              <button
                type="button"
                className={`${styles.control} ${styles.next}`}
                aria-label="Foto successiva"
                onClick={() => step(1)}
              >
                <Icon name="right" size={24} />
              </button>
            )}
          </div>

          <div className={styles.caption}>
            <div className={styles.captionText}>
              <p className={styles.title}>{photo.title}</p>
              {meta && <p className={styles.meta}>{meta}</p>}
            </div>
            {photo.file && (
              <a
                className={buttonClassName("dim", styles.download)}
                href={photo.file.url}
                download
                target="_blank"
                rel="noopener"
              >
                <Icon name="download" size={20} />
                Scarica
                <span className="visually-hidden">: {photo.title}</span>
              </a>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
