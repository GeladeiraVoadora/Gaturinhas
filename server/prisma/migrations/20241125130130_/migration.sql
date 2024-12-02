/*
  Warnings:

  - Added the required column `price` to the `gatinhoFalecido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gatinhoFalecido" ADD COLUMN     "price" INTEGER NOT NULL;
