/*
  Warnings:

  - Made the column `created_date` on table `rephrases` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rephrases" ALTER COLUMN "created_date" SET NOT NULL;
