import Link from "next/link";
import { LotWithReleaseAndSeller } from "../lots.types";
import { ListingCard } from "@/components/listing-card";

export function LotCard({ lot }: { lot: LotWithReleaseAndSeller }) {
    const price = lot.price.toNumber();
    return (
        <ListingCard href={`/lots/${lot.id}`}>
            <h1>{lot.release.title}</h1>
            <p>{lot.release.artist}</p>
            <span>{lot.seller.username}</span>
            <p>{price}</p>
        </ListingCard>
    );
}