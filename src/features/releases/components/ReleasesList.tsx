// import { getReleases } from "../releases.api";
import { ReleaseCard } from "./ReleaseCard";
import styles from "./ReleasesList.module.css";
import { ReleaseType } from "../releases.types";

interface ReleasesListProps {
    releases: ReleaseType[];
}

export async function ReleasesList({ releases }: ReleasesListProps) {
    // const releases = await getReleases();

    return (
        <div className={styles.grid}>
            {releases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
            ))}
        </div>
    );
}
