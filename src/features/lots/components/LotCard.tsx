import Link from "next/link";
import { LotWithReleaseAndSeller } from "../lots.types";

export function LotCard({ lot }: { lot: LotWithReleaseAndSeller }) {
    return (
        <Link href={`/lots/${lot.id}`}>
            <h1>{lot.release.title}</h1>
            <p>{lot.release.artist}</p>
        </Link>
    );
}