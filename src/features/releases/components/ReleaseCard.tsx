import Image from "next/image";
import Link from "next/link";
import { ReleaseType } from "../releases.types";
import styles from "./ReleaseCard.module.css";

type ReleaseCardProps = {
    release: ReleaseType;
    variant?: "grid" | "search";
};

export function ReleaseCard({ release, variant = "grid" }: ReleaseCardProps) {
    if (variant === "search") {
        return (
            <Link href={`/releases/${release.id}`} className={styles.searchCard}>
                <Image
                    src={release.coverArt}
                    alt={`${release.artist} — ${release.title}`}
                    width={48}
                    height={48}
                    className={styles.searchImage}
                />
                <div className={styles.searchInfo}>
                    <span className={styles.searchTitle}>{release.title}</span>
                    <span className={styles.searchArtist}>{release.artist}</span>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/releases/${release.id}`} className={styles.card}>
            <Image
                src={release.coverArt}
                alt={`${release.artist} — ${release.title}`}
                width={400}
                height={400}
                sizes="(max-width: 520px) 50vw, (max-width: 900px) 33vw, 20vw"
                className={styles.image}
            />
            <div className={styles.content}>
                <p className={styles.title}>{release.title}</p>
                <p className={styles.artist}>{release.artist}</p>
                <p className={styles.year}>
                    {release.releaseYear ?? "—"}
                </p>
            </div>
        </Link>
    );
}
