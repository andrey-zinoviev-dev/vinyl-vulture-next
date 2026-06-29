-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'BUYER', 'SELLER');

-- CreateEnum
CREATE TYPE "media_type" AS ENUM ('VINYL', 'CD', 'CASSETTE');

-- CreateEnum
CREATE TYPE "item_condition" AS ENUM ('M', 'NM', 'VG_PLUS', 'VG', 'G_PLUS', 'G', 'F', 'P');

-- CreateEnum
CREATE TYPE "lot_status" AS ENUM ('ACTIVE', 'SOLD', 'SUSPENDED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "roles" "user_role"[] DEFAULT ARRAY['BUYER']::"user_role"[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "releases" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "artist" VARCHAR(255) NOT NULL,
    "media_type" "media_type" NOT NULL,
    "label" VARCHAR(255),
    "cat_number" VARCHAR(100),
    "release_year" INTEGER,
    "barcode" VARCHAR(50),
    "tracklist" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "releases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "release_id" UUID NOT NULL,
    "seller_id" UUID NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "media_condition" "item_condition" NOT NULL,
    "sleeve_condition" "item_condition",
    "comment" TEXT,
    "status" "lot_status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "lots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "releases_artist_idx" ON "releases"("artist");

-- CreateIndex
CREATE INDEX "lots_release_id_idx" ON "lots"("release_id");

-- CreateIndex
CREATE INDEX "lots_seller_id_idx" ON "lots"("seller_id");

-- AddForeignKey
ALTER TABLE "lots" ADD CONSTRAINT "lots_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "releases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lots" ADD CONSTRAINT "lots_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
