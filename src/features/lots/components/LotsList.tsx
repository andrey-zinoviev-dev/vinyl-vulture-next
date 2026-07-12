import { LotWithReleaseAndSeller } from "../lots.types";
import { LotCard } from "./LotCard";

interface LotsListProps {
    lots: LotWithReleaseAndSeller[];
}

export function LotsList({ lots }: LotsListProps) {
    return <div>
        <h2>Lots</h2>
        {lots.map((lot) => (
            <LotCard key={lot.id} lot={lot} />
        ))}
    </div>
}