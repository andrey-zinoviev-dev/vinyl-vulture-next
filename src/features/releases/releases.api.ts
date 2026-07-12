import prisma from "@/lib/prisma";

export const getReleases = async () => {
    const releases = await prisma.release.findMany();
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

