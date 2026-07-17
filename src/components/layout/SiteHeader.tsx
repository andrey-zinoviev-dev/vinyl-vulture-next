import { SearchContainer } from "@/features/search";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span>LOGO</span>
        <SearchContainer />
        <button>Menu</button>
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}
