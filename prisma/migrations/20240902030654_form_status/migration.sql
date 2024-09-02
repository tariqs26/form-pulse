/*
  Warnings:

  - You are about to drop the column `published` on the `Form` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "published",
ADD COLUMN     "status" "FormStatus" NOT NULL DEFAULT 'DRAFT';
