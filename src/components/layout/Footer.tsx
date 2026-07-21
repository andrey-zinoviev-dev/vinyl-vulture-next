import Link from "next/link";
import styles from "./Footer.module.css";

const navLinks = [
  { href: "#", label: "О Vinyl Vultures" },
  { href: "#", label: "Политика конфиденциальности" },
  { href: "#", label: "Офферта" },
  { href: "#", label: "Продавцам" },
  { href: "#", label: "Контакты" },
  { href: "#", label: "Доставка" },
] as const;

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.center}>
          <p className={styles.brand}>Vinyl Vultures</p>
          <p className={styles.cta}>Давайте сотрудничать</p>
          <a href="mailto:info@vinylvultures.com" className={styles.email}>
            info@vinylvultures.com
          </a>
        </div>

        <nav aria-label="Подвал">
          <ul className={styles.nav}>
            {navLinks.map((item, index) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.link}>
                  <span className={styles.index} aria-hidden="true">
                    {formatIndex(index)}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
