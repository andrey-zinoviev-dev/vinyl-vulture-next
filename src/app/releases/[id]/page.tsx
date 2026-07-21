import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LotsList } from "@/features/lots/components/LotsList";
import { formatCondition, formatLotPrice } from "@/features/lots/lots.format";
import { getLotsByReleaseId } from "@/features/lots/lots.api";
import { ReleaseHero } from "@/features/releases/components/ReleaseHero";
import { getReleaseById } from "@/features/releases/releases.api";
import styles from "./page.module.css";

export default async function ReleasePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const release = await getReleaseById(id);
    const lots = await getLotsByReleaseId(id);

    const prices = lots.map((lot) => lot.price.toNumber());
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    const conditions = [
        ...new Set(lots.map((lot) => formatCondition(lot.mediaCondition))),
    ];

    return (
        <div className={styles.page}>
            <SiteHeader />
            <main className={styles.main}>
                <ReleaseHero
                    title={release.title}
                    artist={release.artist}
                    coverArt={release.coverArt}
                    genre={release.genre}
                    mediaType={release.mediaType}
                    releaseYear={release.releaseYear}
                    label={release.label}
                    catNumber={release.catNumber}
                />

                <section className={styles.lots} aria-labelledby="lots-heading">
                    <div className={styles.lotsHeader}>
                        <h2 id="lots-heading" className={styles.lotsHeading}>
                            Лоты ({lots.length})
                        </h2>

                        {lots.length > 0 ? (
                            <div className={styles.lotsMeta}>
                                <div className={styles.lotsMetaCol}>
                                    <span className={styles.lotsMetaLabel}>От</span>
                                    <span className={styles.lotsMetaValue}>
                                        {minPrice != null
                                            ? formatLotPrice(minPrice)
                                            : "—"}
                                    </span>
                                </div>
                                <div className={styles.lotsMetaCol}>
                                    <span className={styles.lotsMetaLabel}>
                                        Состояние
                                    </span>
                                    <ul className={styles.lotsMetaList}>
                                        {conditions.map((condition) => (
                                            <li key={condition}>{condition}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <LotsList lots={lots} />
                </section>
            </main>
            <Footer />
        </div>
    );
}
