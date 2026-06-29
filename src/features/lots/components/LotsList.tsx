import { getLots } from "../lots.api";
import { LotCard } from "./LotCard";

export async function LotsList() {
    const lots = await getLots();
    return <div>
        <h2>Lots</h2>
        {lots.map((lot) => (
            <LotCard key={lot.id} lot={lot} />
        ))}
    </div>
}