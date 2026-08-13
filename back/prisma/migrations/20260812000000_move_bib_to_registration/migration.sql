-- DropColumn
ALTER TABLE "profiles" DROP COLUMN "bib_number";

-- Cleanup dev data: existing registrations have no bib assigned yet.
-- The bib (400-499) is chosen at inscription time.
DELETE FROM "registrations";

-- AlterTable
ALTER TABLE "registrations" ADD COLUMN "bib_number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "registrations_bib_number_key" ON "registrations"("bib_number");