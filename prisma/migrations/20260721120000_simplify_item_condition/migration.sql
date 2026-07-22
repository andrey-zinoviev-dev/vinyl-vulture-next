-- Replace grading scale (M/NM/VG+/…) with three buyer-friendly states.

CREATE TYPE "item_condition_new" AS ENUM ('Новое', 'Б/у идеал', 'Б/у с комментарием');

ALTER TABLE "lots"
  ALTER COLUMN "media_condition" TYPE "item_condition_new"
  USING (
    CASE "media_condition"::text
      WHEN 'M' THEN 'Новое'
      WHEN 'NM' THEN 'Б/у идеал'
      WHEN 'VG_PLUS' THEN 'Б/у идеал'
      WHEN 'VG' THEN 'Б/у с комментарием'
      WHEN 'G_PLUS' THEN 'Б/у с комментарием'
      WHEN 'G' THEN 'Б/у с комментарием'
      WHEN 'F' THEN 'Б/у с комментарием'
      WHEN 'P' THEN 'Б/у с комментарием'
    END::"item_condition_new"
  );

ALTER TABLE "lots"
  ALTER COLUMN "sleeve_condition" TYPE "item_condition_new"
  USING (
    CASE "sleeve_condition"::text
      WHEN 'M' THEN 'Новое'
      WHEN 'NM' THEN 'Б/у идеал'
      WHEN 'VG_PLUS' THEN 'Б/у идеал'
      WHEN 'VG' THEN 'Б/у с комментарием'
      WHEN 'G_PLUS' THEN 'Б/у с комментарием'
      WHEN 'G' THEN 'Б/у с комментарием'
      WHEN 'F' THEN 'Б/у с комментарием'
      WHEN 'P' THEN 'Б/у с комментарием'
      ELSE NULL
    END::"item_condition_new"
  );

DROP TYPE "item_condition";
ALTER TYPE "item_condition_new" RENAME TO "item_condition";
