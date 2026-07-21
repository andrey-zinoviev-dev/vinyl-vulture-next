import type { ItemCondition } from "@/generated/prisma/client";

const CONDITION_LABEL: Record<ItemCondition, string> = {
    M: "M",
    NM: "NM",
    VG_PLUS: "VG+",
    VG: "VG",
    G_PLUS: "G+",
    G: "G",
    F: "F",
    P: "P",
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
