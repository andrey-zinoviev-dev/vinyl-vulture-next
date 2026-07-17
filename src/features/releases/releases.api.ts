import prisma from "@/lib/prisma";

export const getReleases = async ({ limit, offset, sort }: { limit: number, offset: number, sort: string }) => {
    const releases = await prisma.release.findMany({
        take: limit,
        skip: offset,
    });
    return releases;
};

export const getReleaseById = async (id: string) => {
    const release = await prisma.release.findUnique({
        where: {
            id,
        },
    });
    if (!release) {
        throw new Error("Release not found");
    }
    return release;
};

