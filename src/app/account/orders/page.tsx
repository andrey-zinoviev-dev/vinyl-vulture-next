import styles from "../account.module.css";

export default function AccountOrdersPage() {
  return (
    <section className={styles.section} aria-labelledby="account-orders-heading">
      <h1 id="account-orders-heading" className={styles.title}>
        История заказов
      </h1>
      <p className={styles.empty}>Пока пусто</p>
    </section>
  );
}
