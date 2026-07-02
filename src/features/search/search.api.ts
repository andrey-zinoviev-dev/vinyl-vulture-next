import prisma from "@/lib/prisma";

export const search = async (query: string) => {
    const releases = await prisma.release.findMany({
        where: {
            OR: [
                { title: { contains: query } },
                { artist: { contains: query } },
            ],
        },
    });

    return releases;
};