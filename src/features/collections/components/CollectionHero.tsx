import Image from "next/image";
import { ReleasesList } from "@/features/releases";
import type { ReleaseType } from "@/features/releases/releases.types";
import styles from "./CollectionHero.module.css";

type CollectionHeroProps = {
    title: string;
    description: string;
    label?: string | null;
    coverArt?: string | null;
    curator?: string | null;
    releases: ReleaseType[];
};

function formatGenre(genre: string) {
    return genre.replaceAll("_", " ");
}

function getDominantGenre(releases: ReleaseType[]) {
    const counts = new Map<string, number>();

    for (const release of releases) {
        counts.set(release.genre, (counts.get(release.genre) ?? 0) + 1);
    }

    let dominant = "OTHER";
    let max = 0;

    for (const [genre, count] of counts) {
        if (count > max) {
            dominant = genre;
            max = count;
        }
    }

    return formatGenre(dominant);
}

function countTracks(releases: ReleaseType[]) {
    return releases.reduce((total, release) => {
        if (Array.isArray(release.tracklist)) {
            return total + release.tracklist.length;
        }

        return total;
    }, 0);
}

export function CollectionHero({
    title,
    description,
    label,
    coverArt,
    curator = "ADMIN",
    releases,
}: CollectionHeroProps) {
    const total = releases.length;
    const genre = getDominantGenre(releases);
    const tracks = countTracks(releases);

    return (
        <section className={styles.hero} aria-labelledby="collection-title">
            <div className={styles.split}>
                <div className={styles.copy}>
                    <div className={styles.copyTop}>
                        <h2 id="collection-title" className={styles.title}>
                            {title}
                        </h2>
                        {label ? (
                            <span className={styles.label}>{label}</span>
                        ) : null}
                        {/* <p className={styles.description}>{description}</p> */}
                    </div>
                    <p className={styles.specs}>
                        Genre: {genre} / Albums: {releases.length} / Curator:{" "}
                        {curator}
                    </p>
                </div>

                <div className={styles.aside}>
                    <div className={styles.coverBlock}>
                        <div className={styles.cover}>
                            {coverArt ? (
                                <Image
                                    src={coverArt}
                                    alt=""
                                    width={500}
                                    height={500}
                                    priority
                                    sizes="(max-width: 900px) 100vw, 50vw"
                                    className={styles.coverImage}
                                />
                            ) : null}
                        </div>
                        <div className={styles.coverMeta}>
                            <span className={styles.coverName}>{description}</span>
                            {/* <span>/01</span> */}
                        </div>
                    </div>
                </div>
            </div>

            {total > 0 ? (
                <div className={styles.releases} aria-label="Релизы коллекции">
                    <ReleasesList releases={releases} />
                </div>
            ) : null}
        </section>
    );
}
