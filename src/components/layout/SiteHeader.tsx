import Link from "next/link";
import { SearchContainer } from "@/features/search";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Vinyl Vultures
        </Link>
        <SearchContainer />
        <div className={styles.actions}>
          <button type="button" className={styles.action}>
            Корзина
          </button>
          <Link href="/account" className={styles.action}>
            Войти
          </Link>
        </div>
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}
