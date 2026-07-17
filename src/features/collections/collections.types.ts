import { Prisma } from "@/generated/prisma/client";

export type Collection = Prisma.CollectionGetPayload<{
    include: {
        items: {
            include: {
                release: true;
            };
        };
    };
}>;


