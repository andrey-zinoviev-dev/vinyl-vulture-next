import prisma from "@/lib/prisma";

export const getLots = async () => {
    const lots = await prisma.lot.findMany( {
        include: {
            release: true,
            seller: true,
        },
    });
    return lots;
};

export const getLot = async (id: string) => {
    const lot = await prisma.lot.findUnique({
        where: { id },
        include: {
            release: true,
            seller: true,
        },
    });
    return lot;
};
