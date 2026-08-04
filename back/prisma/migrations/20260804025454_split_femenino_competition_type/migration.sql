/*
  Warnings:

  - The values [FEMENINO] on the enum `CompetitionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CompetitionType_new" AS ENUM ('EXPERTOS', 'FEMENINOFIJA', 'FEMENINORUTA');
ALTER TABLE "registrations" ALTER COLUMN "competition_type" TYPE "CompetitionType_new" USING ("competition_type"::text::"CompetitionType_new");
ALTER TYPE "CompetitionType" RENAME TO "CompetitionType_old";
ALTER TYPE "CompetitionType_new" RENAME TO "CompetitionType";
DROP TYPE "public"."CompetitionType_old";
COMMIT;
