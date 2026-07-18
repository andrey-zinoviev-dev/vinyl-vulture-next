import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./CatalogSection.module.css";

const COLUMN_COUNT = 4;

export type CatalogSectionProps = {
  title: string;
  description: string;
  label: string;
  viewAllHref?: string;
  children: ReactNode;
};

function formatColumnLabel(index: number) {
  return `R.${String(index + 1).padStart(3, "0")}`;
}

export function CatalogSection({
  title,
  description,
  label,
  viewAllHref,
  children,
}: CatalogSectionProps) {
  const titleContent = (
    <>
      <span className={styles.times}>×</span>
      {title}
      <span className={styles.reg}>®</span>
    </>
  );

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>
              {viewAllHref ? (
                <Link href={viewAllHref} className={styles.titleLink}>
                  {titleContent}
                </Link>
              ) : (
                titleContent
              )}
            </h2>
            {/* <span className={styles.label}>{label}</span> */}
          </div>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.gridArea}>
          <div className={styles.columnLabels} aria-hidden="true">
            {Array.from({ length: COLUMN_COUNT }).map((_, index) => (
              <span key={index} className={styles.columnLabel}>
                {formatColumnLabel(index)}
              </span>
            ))}
          </div>
          {children}
          {viewAllHref ? (
            <Link href={viewAllHref} className={styles.viewAll}>
              Посмотреть все
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
