-- AlterTable
ALTER TABLE "album" ADD COLUMN     "exodiaCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "gaturinha" ADD COLUMN     "isExodia" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "exodia" (
    "exodiaId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "exodia_pkey" PRIMARY KEY ("exodiaId")
);

-- CreateTable
CREATE TABLE "_ExodiaGaturinhas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "exodia_name_key" ON "exodia"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ExodiaGaturinhas_AB_unique" ON "_ExodiaGaturinhas"("A", "B");

-- CreateIndex
CREATE INDEX "_ExodiaGaturinhas_B_index" ON "_ExodiaGaturinhas"("B");

-- AddForeignKey
ALTER TABLE "_ExodiaGaturinhas" ADD CONSTRAINT "_ExodiaGaturinhas_A_fkey" FOREIGN KEY ("A") REFERENCES "exodia"("exodiaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExodiaGaturinhas" ADD CONSTRAINT "_ExodiaGaturinhas_B_fkey" FOREIGN KEY ("B") REFERENCES "gaturinha"("gatId") ON DELETE CASCADE ON UPDATE CASCADE;
