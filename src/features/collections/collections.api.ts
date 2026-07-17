import prisma from "@/lib/prisma";
import { Collection } from "./collections.types";

const collectionInclude = {
    items: {
        include: {
            release: true,
        },
        orderBy: {
            position: "asc" as const,
        },
    },
};

export async function getCollections(): Promise<Collection[]> {
    return await prisma.collection.findMany({
        include: collectionInclude,
        where: {
            isPublished: true,
        },
    });
}

export async function getCollectionBySlug(
    slug: string,
): Promise<Collection | null> {
    return await prisma.collection.findFirst({
        where: {
            slug,
            isPublished: true,
        },
        include: collectionInclude,
    });
}
