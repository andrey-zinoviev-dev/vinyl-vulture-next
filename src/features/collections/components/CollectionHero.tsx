import Image from "next/image";
import styles from "./CollectionHero.module.css";

type CollectionHeroProps = {
    title: string;
    description: string;
    label?: string | null;
    coverArt?: string | null;
};

export function CollectionHero({
    title,
    description,
    label,
    coverArt,
}: CollectionHeroProps) {
    return (
        <section className={styles.hero} aria-labelledby="collection-title">
            <div className={styles.split}>
                <div className={styles.copy}>
                    <div className={styles.meta}>
                        {label ? (
                            <span className={styles.label}>{label}</span>
                        ) : null}
                        <p className={styles.description}>{description}</p>
                    </div>

                    <h2 id="collection-title" className={styles.title}>
                        {title}
                    </h2>
                </div>

                <div className={styles.media}>
                    {coverArt ? (
                        <Image
                            src={coverArt}
                            alt=""
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.image}
                        />
                    ) : null}
                </div>
            </div>
        </section>
    );
}
