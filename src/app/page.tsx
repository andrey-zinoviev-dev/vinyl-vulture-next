import { ReleasesList } from "@/features/releases";
import styles from "./page.module.css";
import { SearchContainer } from "@/features/search";

export default async function Home() {
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SearchContainer />
        <ReleasesList />
      </main>
    </div>
  );
}
