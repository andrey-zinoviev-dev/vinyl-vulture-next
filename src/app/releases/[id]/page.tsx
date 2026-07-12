import { getReleaseById } from "@/features/releases/releases.api";
import { getLotsByReleaseId } from "@/features/lots/lots.api";
import { LotsList } from "@/features/lots/components/LotsList";

export default async function ReleasePage({params}: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const release = await getReleaseById(id);
    const lots = await getLotsByReleaseId(id);
    return (
        <div>
            <h2>{release.title}</h2>
            <LotsList lots={lots} />
        </div>
    );
}
