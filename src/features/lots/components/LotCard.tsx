import Link from "next/link";
import type { ItemCondition } from "@/generated/prisma/client";
import { formatCondition, formatLotPrice } from "../lots.format";
import type { LotWithReleaseAndSeller } from "../lots.types";
import styles from "./LotCard.module.css";

type LotCardProps = {
    lot: LotWithReleaseAndSeller;
    index: number;
};

const CONDITION_COLOR: Record<ItemCondition, string> = {
    M: "#22c55e",
    NM: "#3b82f6",
    VG_PLUS: "#14b8a6",
    VG: "#eab308",
    G_PLUS: "#f97316",
    G: "#ef4444",
    F: "#a855f7",
    P: "#6b7280",
};

function formatIndex(index: number) {
    return String(index).padStart(2, "0");
}

function buildTags(lot: LotWithReleaseAndSeller): string[] {
    const tags = [`#${formatCondition(lot.mediaCondition)}`];

    if (lot.sleeveCondition) {
        tags.push(`#Конверт_${formatCondition(lot.sleeveCondition)}`);
    }

    if (lot.quantity > 1) {
        tags.push(`#Шт_${lot.quantity}`);
    }

    if (lot.status === "SOLD") {
        tags.push("#Продано");
    } else if (lot.status === "SUSPENDED") {
        tags.push("#Снято");
    }

    return tags;
}

export function LotCard({ lot, index }: LotCardProps) {
    const price = lot.price.toNumber();
    const tags = buildTags(lot);

    return (
        <Link href={`/lots/${lot.id}`} className={styles.row}>
            <div className={styles.main}>
                <span className={styles.index}>{formatIndex(index)}</span>
                <span
                    className={styles.swatch}
                    style={{ backgroundColor: CONDITION_COLOR[lot.mediaCondition] }}
                    aria-hidden
                />
                <span className={styles.title}>
                    {lot.seller.username}
                    <span className={styles.dash}> — </span>
                    <span className={styles.subtitle}>{formatLotPrice(price)}</span>
                </span>
            </div>

            <ul className={styles.tags} aria-label="Параметры лота">
                {tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                        {tag}
                    </li>
                ))}
            </ul>
        </Link>
    );
}
