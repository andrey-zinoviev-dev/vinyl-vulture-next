import Image from "next/image";
import styles from "./ReleaseHero.module.css";

type ReleaseHeroProps = {
    title: string;
    artist: string;
    coverArt: string;
    genre: string;
    mediaType: string;
    releaseYear?: number | null;
    label?: string | null;
    catNumber?: string | null;
    description?: string | null;
};

const MEDIA_TYPE_LABEL: Record<string, string> = {
    VINYL: "Винил",
    CD: "CD",
    CASSETTE: "Кассета",
};

function formatGenre(value: string) {
    return value.replaceAll("_", " ");
}

function formatMediaType(value: string) {
    return MEDIA_TYPE_LABEL[value] ?? value.replaceAll("_", " ");
}

type MetaRow = {
    label: string;
    value: string;
};

export function ReleaseHero({
    title,
    artist,
    coverArt,
    genre,
    mediaType,
    releaseYear,
    label,
    catNumber,
    description,
}: ReleaseHeroProps) {
    const rows: MetaRow[] = [
        { label: "Жанр", value: formatGenre(genre) },
        // { label: "Формат", value: formatMediaType(mediaType) },
        { label: "Релиз", value: title },
        ...(label ? [{ label: "Лейбл", value: label }] : []),
        ...(catNumber ? [{ label: "Каталог", value: catNumber }] : []),
        ...(releaseYear != null
            ? [{ label: "Год", value: String(releaseYear) }]
            : []),
    ];

    return (
        <section className={styles.hero} aria-labelledby="release-title">
            <div className={styles.split}>
                <div className={styles.cover}>
                    <Image
                        src={coverArt}
                        alt={`${artist} — ${title}`}
                        fill
                        priority
                        sizes="(max-width: 900px) 100vw, 45vw"
                        className={styles.coverImage}
                    />
                </div>

                <div className={styles.details}>
                    <div className={styles.heading}>
                        <h1 id="release-title" className={styles.title}>
                            {title}
                        </h1>
                        <p className={styles.artist}>{artist}</p>
                    </div>

                    <div className={styles.aside}>
                        <dl className={styles.meta}>
                            {rows.map((row) => (
                                <div key={row.label} className={styles.row}>
                                    <dt className={styles.term}>{row.label}</dt>
                                    <dd className={styles.definition}>
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {description ? (
                            <p className={styles.description}>{description}</p>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
