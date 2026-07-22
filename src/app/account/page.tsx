import Link from "next/link";
import { AccountRecentChats } from "@/features/account";
import { getReleases, ReleasesList } from "@/features/releases";
import styles from "./account.module.css";

export default async function AccountHomePage() {
  const recentViews = await getReleases({
    limit: 6,
    offset: 0,
    sort: "newest",
  });

  return (
    <div className={styles.home}>
      <section className={styles.section} aria-labelledby="account-home-heading">
        <h1 id="account-home-heading" className={styles.title}>
          Домашний экран
        </h1>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Избранное</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Заказы</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Просмотры</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>В корзине</span>
          </div>
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="account-recent-views-heading"
      >
        <div className={styles.sectionHeader}>
          <h2 id="account-recent-views-heading" className={styles.sectionTitle}>
            Последние просмотры
          </h2>
          <Link href="/account/history" className={styles.sectionLink}>
            Все
          </Link>
        </div>
        {recentViews.length > 0 ? (
          <ReleasesList releases={recentViews} />
        ) : (
          <p className={styles.empty}>Пока пусто</p>
        )}
      </section>

      <section
        className={styles.section}
        aria-labelledby="account-recent-chats-heading"
      >
        <div className={styles.sectionHeader}>
          <h2 id="account-recent-chats-heading" className={styles.sectionTitle}>
            Последние чаты
          </h2>
        </div>
        <AccountRecentChats />
      </section>
    </div>
  );
}
