-- CreateTable
CREATE TABLE "favourite_releases" (
    "user_id" UUID NOT NULL,
    "release_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favourite_releases_pkey" PRIMARY KEY ("user_id","release_id")
);

-- CreateIndex
CREATE INDEX "favourite_releases_release_id_idx" ON "favourite_releases"("release_id");

-- AddForeignKey
ALTER TABLE "favourite_releases" ADD CONSTRAINT "favourite_releases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite_releases" ADD CONSTRAINT "favourite_releases_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "releases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
