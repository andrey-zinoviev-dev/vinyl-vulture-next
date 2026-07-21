import { CatalogSection } from "@/components/layout/CatalogSection";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getReleases, ReleasesList } from "@/features/releases";
import styles from "./page.module.css";
import { getCollections } from "@/features/collections";

export default async function Home() {
  const newReleases = await getReleases({
    limit: 8,
    offset: 0,
    sort: "newest",
  });

  const collections = await getCollections();

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <CatalogSection
          title="Новые релизы"
          description="Самое свежее из релизов, которые уже на площадке"
          label="• VV"
          viewAllHref="/releases?sort=newest"
        >
          <ReleasesList releases={newReleases} />
        </CatalogSection>
        
        {collections.map((collection) => {
          const collectionItems = collection.items.map((item) => item.release);
          return (
            <CatalogSection
              key={collection.id}
              title={collection.title}
              description={collection.description}
              label={collection.label ?? ""}
              viewAllHref={`/collections/${collection.slug}`}
            >
              <ReleasesList releases={collectionItems} />
            </CatalogSection>
          )
        })}
      </main>
      <Footer />
    </div>
  );
}
