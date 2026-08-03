-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "CompetitionType" AS ENUM ('EXPERTOS', 'FEMENINO');

-- CreateEnum
CREATE TYPE "RaceStatus" AS ENUM ('SCHEDULED', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('PRINCIPIANTE', 'NOVATO', 'EXPERTO', 'RUTA', 'MUJER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "bib_number" INTEGER NOT NULL,
    "kilometers" INTEGER,
    "category" "CategoryType",
    "team" TEXT,
    "bike_photo_url" TEXT,
    "bike_nickname" TEXT,
    "bike_frame" TEXT,
    "bike_ratio" TEXT,
    "bike_weight" DECIMAL(65,30),
    "bike_size" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "competition_type" "CompetitionType" NOT NULL,
    "document" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "eps" TEXT NOT NULL,
    "emergency_contact_name" TEXT NOT NULL,
    "emergency_contact_phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "race_dates" (
    "id" SERIAL NOT NULL,
    "round_number" INTEGER NOT NULL,
    "title" TEXT,
    "race_date" TIMESTAMP(3) NOT NULL,
    "status" "RaceStatus" NOT NULL DEFAULT 'SCHEDULED',
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "race_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "race_date_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_bib_number_key" ON "profiles"("bib_number");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_profile_id_key" ON "registrations"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_document_key" ON "registrations"("document");

-- CreateIndex
CREATE UNIQUE INDEX "race_dates_round_number_key" ON "race_dates"("round_number");

-- CreateIndex
CREATE UNIQUE INDEX "results_race_date_id_profile_id_key" ON "results"("race_date_id", "profile_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_race_date_id_fkey" FOREIGN KEY ("race_date_id") REFERENCES "race_dates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
