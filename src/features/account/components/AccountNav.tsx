"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AccountNav.module.css";

const NAV_ITEMS: { href: string; label: string; exact?: boolean }[] = [
  { href: "/account", label: "Домашний экран", exact: true },
  { href: "/account/favorites", label: "Избранное" },
  { href: "/account/orders", label: "История заказов" },
  { href: "/account/history", label: "История просмотров" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Личный кабинет">
      <ul className={styles.list}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={active ? `${styles.link} ${styles.linkActive}` : styles.link}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
