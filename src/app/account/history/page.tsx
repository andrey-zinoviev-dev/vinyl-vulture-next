import styles from "../account.module.css";

export default function AccountHistoryPage() {
  return (
    <section className={styles.section} aria-labelledby="account-history-heading">
      <h1 id="account-history-heading" className={styles.title}>
        История просмотров
      </h1>
      <p className={styles.empty}>Пока пусто</p>
    </section>
  );
}
