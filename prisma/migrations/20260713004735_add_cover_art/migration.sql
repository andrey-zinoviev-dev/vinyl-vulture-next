-- CreateEnum
CREATE TYPE "genre" AS ENUM ('ROCK', 'JAZZ', 'ELECTRONIC', 'HIP_HOP', 'CLASSICAL', 'FOLK', 'METAL', 'PUNK', 'SOUL', 'REGGAE', 'BLUES', 'LATIN', 'FUNK', 'POP', 'SOUNDTRACK', 'OTHER');

-- AlterTable
ALTER TABLE "releases" ADD COLUMN     "cover_art" TEXT,
ADD COLUMN     "genre" "genre" NOT NULL DEFAULT 'OTHER',
ALTER COLUMN "label" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "releases_genre_idx" ON "releases"("genre");

-- CreateIndex
CREATE INDEX "releases_release_year_idx" ON "releases"("release_year");
