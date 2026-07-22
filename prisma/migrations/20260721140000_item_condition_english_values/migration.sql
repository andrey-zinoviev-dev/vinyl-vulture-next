-- Store stable enum identifiers in DB; Russian labels live in the UI layer.

CREATE TYPE "item_condition_new" AS ENUM ('NEW', 'USED_PERFECT', 'USED_WITH_NOTES');

ALTER TABLE "lots"
  ALTER COLUMN "media_condition" TYPE "item_condition_new"
  USING (
    CASE "media_condition"::text
      WHEN 'Новое' THEN 'NEW'
      WHEN 'Б/у идеал' THEN 'USED_PERFECT'
      WHEN 'Б/у с комментарием' THEN 'USED_WITH_NOTES'
      ELSE "media_condition"::text
    END::"item_condition_new"
  );

ALTER TABLE "lots"
  ALTER COLUMN "sleeve_condition" TYPE "item_condition_new"
  USING (
    CASE "sleeve_condition"::text
      WHEN 'Новое' THEN 'NEW'
      WHEN 'Б/у идеал' THEN 'USED_PERFECT'
      WHEN 'Б/у с комментарием' THEN 'USED_WITH_NOTES'
      ELSE "sleeve_condition"::text
    END::"item_condition_new"
  );

DROP TYPE "item_condition";
ALTER TYPE "item_condition_new" RENAME TO "item_condition";
