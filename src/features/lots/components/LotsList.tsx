import { LotCard } from "./LotCard";
import type { LotWithReleaseAndSeller } from "../lots.types";
import styles from "./LotsList.module.css";

type LotsListProps = {
    lots: LotWithReleaseAndSeller[];
};

export function LotsList({ lots }: LotsListProps) {
    if (lots.length === 0) {
        return <p className={styles.empty}>Пока нет лотов на этот релиз</p>;
    }

    return (
        <ul className={styles.list}>
            {lots.map((lot, index) => (
                <li key={lot.id} className={styles.item}>
                    <LotCard lot={lot} index={index + 1} />
                </li>
            ))}
        </ul>
    );
}
