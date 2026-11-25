"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Icon } from "@/components/Icon/Icon";
import { Logo } from "@/components/Logo/Logo";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { mainNavigation } from "@/lib/navigation";
import { isCurrentSection } from "@/lib/routes";
import type { SocialLink } from "@/lib/wp/types";
import { NavDisc } from "./NavDisc";
import styles from "./MobileMenu.module.css";

const DESKTOP_QUERY = "(min-width: 901px)";
const DIALOG_ID = "menu-mobile";

type MobileMenuProps = {
  socialLinks: SocialLink[];
};

export function MobileMenu({ socialLinks }: MobileMenuProps) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, [open]);

  function handleClose() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleNavigate(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof Element && event.target.closest("a")) {
      setOpen(false);
    }
  }

  function toggleGroup(id: string) {
    setCollapsedGroups((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.burger}
        aria-expanded={open}
        aria-controls={DIALOG_ID}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Icon name="menu" size={22} />
        Menu
      </button>

      <dialog
        ref={dialogRef}
        id={DIALOG_ID}
        className={styles.dialog}
        aria-label="Menu"
        onClose={handleClose}
        onClick={handleNavigate}
      >
        <div className={styles.bar}>
          <Logo />
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Chiudi il menu"
            onClick={() => setOpen(false)}
          >
            <Icon name="close" size={20} />
            Chiudi
          </button>
        </div>

        <nav aria-label="Principale">
          <ul role="list" className={styles.list}>
            {mainNavigation.map((item) => {
              if (item.kind === "link") {
                const current = isCurrentSection(pathname, item.href);
                return (
                  <li key={item.id}>
                    <Link href={item.href} className={styles.top} aria-current={current ? "page" : undefined}>
                      {item.label}
                      <Icon name="arrow" size={22} />
                    </Link>
                  </li>
                );
              }

              const expanded = !collapsedGroups.has(item.id);
              const subId = `menu-mobile-${item.id}`;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={styles.top}
                    aria-expanded={expanded}
                    aria-controls={subId}
                    onClick={() => toggleGroup(item.id)}
                  >
                    {item.label}
                    <Icon name={expanded ? "up" : "down"} size={22} />
                  </button>
                  <ul role="list" id={subId} className={styles.sub} hidden={!expanded}>
                    {item.children.map((child) => {
                      const current = isCurrentSection(pathname, child.href);
                      return (
                        <li key={child.href}>
                          <Link href={child.href} className={styles.subLink} aria-current={current ? "page" : undefined}>
                            <NavDisc icon={child.icon} color={child.color} size="small" />
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.foot}>
          <p className={styles.followLabel}>Seguici</p>
          <SocialLinks links={socialLinks} tone="dark" />
        </div>
      </dialog>
    </>
  );
}
