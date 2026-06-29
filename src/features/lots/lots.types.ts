import { Prisma } from "@/generated/prisma/client";

export type LotWithReleaseAndSeller = Prisma.LotGetPayload<{
    include: {
        release: true;
        seller: true;
    };
}>;
