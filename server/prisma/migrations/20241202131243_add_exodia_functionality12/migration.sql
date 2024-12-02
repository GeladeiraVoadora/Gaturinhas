/*
  Warnings:

  - Added the required column `userId` to the `exodia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exodia" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "exodia" ADD CONSTRAINT "exodia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
