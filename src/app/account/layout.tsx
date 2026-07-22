import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AccountNav } from "@/features/account";
import styles from "./layout.module.css";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <AccountNav />
        </aside>
        <div className={styles.content}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
