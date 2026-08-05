/*
  Warnings:

  - The values [FEMENINOFIJA,FEMENINORUTA] on the enum `CompetitionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CompetitionType_new" AS ENUM ('EXPERTOS', 'FEMENINO');
ALTER TABLE "registrations" ALTER COLUMN "competition_type" TYPE "CompetitionType_new" USING (
    CASE "competition_type"::text
        WHEN 'FEMENINOFIJA' THEN 'FEMENINO'
        WHEN 'FEMENINORUTA' THEN 'FEMENINO'
        ELSE "competition_type"::text
    END::"CompetitionType_new"
);
ALTER TYPE "CompetitionType" RENAME TO "CompetitionType_old";
ALTER TYPE "CompetitionType_new" RENAME TO "CompetitionType";
DROP TYPE "public"."CompetitionType_old";
COMMIT;
