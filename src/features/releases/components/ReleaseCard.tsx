import Link from "next/link";
import { ReleaseType } from "../releases.types";

export function ReleaseCard({ release }: { release: ReleaseType }) {
    return (
        <Link href={`/releases/${release.id}`}>
            <h1>{release.title}</h1>
            <p>{release.artist}</p>
        </Link>
    );
}