"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon/Icon";
import { isNavItemActive, mainNavigation, type NavGroupItem } from "@/lib/navigation";
import { isCurrentSection } from "@/lib/routes";
import { NavDisc } from "./NavDisc";
import styles from "./DesktopNav.module.css";

export function DesktopNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenGroup(null);
  }

  useEffect(() => {
    if (openGroup === null) return;

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setOpenGroup(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-group="${openGroup}"]`);
      setOpenGroup(null);
      trigger?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openGroup]);

  function toggle(group: NavGroupItem) {
    setOpenGroup((current) => (current === group.id ? null : group.id));
  }

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Principale">
      <ul role="list" className={styles.list}>
        {mainNavigation.map((item) => {
          const active = isNavItemActive(item, pathname);

          if (item.kind === "link") {
            return (
              <li key={item.id} className={styles.item}>
                <Link
                  href={item.href}
                  className={[styles.link, active && styles.active].filter(Boolean).join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const open = openGroup === item.id;
          const dropdownId = `nav-${item.id}`;
          const stateClass = open ? styles.open : active ? styles.active : undefined;

          return (
            <li key={item.id} className={styles.item}>
              <button
                type="button"
                data-group={item.id}
                className={[styles.link, stateClass].filter(Boolean).join(" ")}
                aria-expanded={open}
                aria-controls={dropdownId}
                onClick={() => toggle(item)}
              >
                {item.label}
                <Icon name="down" size={18} />
              </button>
              <ul role="list" id={dropdownId} className={styles.dropdown} hidden={!open}>
                {item.children.map((child) => {
                  const current = isCurrentSection(pathname, child.href);
                  return (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={styles.dropdownLink}
                        aria-current={current ? "page" : undefined}
                        onClick={() => setOpenGroup(null)}
                      >
                        <NavDisc icon={child.icon} color={child.color} size="xsmall" />
                        <span>
                          <span className={styles.dropdownTitle}>{child.label}</span>
                          <span className={styles.dropdownText}>{child.description}</span>
                        </span>
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
  );
}
