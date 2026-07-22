import type { ItemCondition } from "@/generated/prisma/client";

const CONDITION_LABEL: Record<ItemCondition, string> = {
    NEW: "Новое",
    USED_PERFECT: "Б/у идеал",
    USED_WITH_NOTES: "Б/у с комментарием",
};

export function formatCondition(condition: ItemCondition) {
    return CONDITION_LABEL[condition];
}

export function formatLotPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}
