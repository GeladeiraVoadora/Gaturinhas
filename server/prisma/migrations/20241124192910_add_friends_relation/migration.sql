-- AlterTable
ALTER TABLE "pacotefig" ALTER COLUMN "image" SET DEFAULT 'https://i.imgur.com/GJGafhC.png',
ALTER COLUMN "desc" SET DEFAULT 'Alguém soltou uma bomba no bairro! Quais gatinhos mistériosos devem ter se escondido aqui?';

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "bio" TEXT;

-- CreateTable
CREATE TABLE "_UserFriends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFriends_AB_unique" ON "_UserFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFriends_B_index" ON "_UserFriends"("B");

-- AddForeignKey
ALTER TABLE "_UserFriends" ADD CONSTRAINT "_UserFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "usuario"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFriends" ADD CONSTRAINT "_UserFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
