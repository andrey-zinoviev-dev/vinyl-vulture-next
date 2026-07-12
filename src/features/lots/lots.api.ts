import prisma from "@/lib/prisma";

export const getLotsByReleaseId = async (releaseId: string) => {
    const lots = await prisma.lot.findMany({
        where: { releaseId },
        include: {
            release: true,
            seller: true,
        },
    });
    return lots;
};

export const getLotById = async (id: string) => {
    const lot = await prisma.lot.findUnique({
        where: { id },
        include: {
            release: true,
            seller: true,
        },
    });
    return lot;
};