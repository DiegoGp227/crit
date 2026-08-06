/*
  Warnings:

  - The values [CANCELLED] on the enum `RaceStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `round_number` on the `race_dates` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `race_dates` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResultStatus" AS ENUM ('PRESENT', 'ABSENT');

-- AlterEnum
BEGIN;
CREATE TYPE "RaceStatus_new" AS ENUM ('SCHEDULED', 'FINISHED', 'POSTPONED');
ALTER TABLE "public"."race_dates" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "race_dates" ALTER COLUMN "status" TYPE "RaceStatus_new" USING ("status"::text::"RaceStatus_new");
ALTER TYPE "RaceStatus" RENAME TO "RaceStatus_old";
ALTER TYPE "RaceStatus_new" RENAME TO "RaceStatus";
DROP TYPE "public"."RaceStatus_old";
ALTER TABLE "race_dates" ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';
COMMIT;

-- DropIndex
DROP INDEX "race_dates_round_number_key";

-- AlterTable
ALTER TABLE "race_dates" DROP COLUMN "round_number",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "results" ADD COLUMN     "status" "ResultStatus" NOT NULL DEFAULT 'PRESENT';
