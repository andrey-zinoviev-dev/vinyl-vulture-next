import { getReleases } from "../releases.api";
import { ReleaseCard } from "./ReleaseCard";

export async function ReleasesList() {
    const releases = await getReleases();
    return <div>
        <h2>Releases</h2>
        {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
        ))}
    </div>
}