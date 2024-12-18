/*
  Warnings:

  - You are about to drop the column `tokenk` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "tokenk",
ADD COLUMN     "token" TEXT;
