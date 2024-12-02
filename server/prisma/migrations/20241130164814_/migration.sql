/*
  Warnings:

  - The primary key for the `gatinhoFalecido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `FalecidoId` on the `gatinhoFalecido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gatinhoFalecido" DROP CONSTRAINT "gatinhoFalecido_pkey",
DROP COLUMN "FalecidoId",
ADD COLUMN     "falecidoId" SERIAL NOT NULL,
ADD CONSTRAINT "gatinhoFalecido_pkey" PRIMARY KEY ("falecidoId");
