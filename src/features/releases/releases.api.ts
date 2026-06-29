import prisma from "@/lib/prisma";

export const getReleases = async () => {
    const releases = await prisma.release.findMany();
    return releases;
};