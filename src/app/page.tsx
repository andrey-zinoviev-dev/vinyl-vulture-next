import { ReleasesList } from "@/features/releases";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ReleasesList />
      </main>
    </div>
  );
}
