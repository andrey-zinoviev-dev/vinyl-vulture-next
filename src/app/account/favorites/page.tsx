import styles from "../account.module.css";

export default function AccountFavoritesPage() {
  return (
    <section className={styles.section} aria-labelledby="account-favorites-heading">
      <h1 id="account-favorites-heading" className={styles.title}>
        Избранное
      </h1>
      <p className={styles.empty}>Пока пусто</p>
    </section>
  );
}
