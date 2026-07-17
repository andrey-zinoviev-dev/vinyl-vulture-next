/*
  Warnings:

  - Made the column `cover_art` on table `releases` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "releases" ALTER COLUMN "cover_art" SET NOT NULL;
