/*
  Warnings:

  - You are about to drop the column `exodiaCompleted` on the `album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "album" DROP COLUMN "exodiaCompleted";

-- AlterTable
ALTER TABLE "cemiterio" ADD COLUMN     "exodiaCompleted" BOOLEAN NOT NULL DEFAULT false;
