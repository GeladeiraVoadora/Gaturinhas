-- AlterTable
ALTER TABLE "pacotefig" ALTER COLUMN "image" SET DEFAULT 'https://i.imgur.com/GJGafhC.png',
ALTER COLUMN "desc" SET DEFAULT 'Alguém soltou uma bomba no bairro! Quais gatinhos mistériosos devem ter se escondido aqui?';

-- CreateTable
CREATE TABLE "gatinhoFalecido" (
    "FalecidoId" SERIAL NOT NULL,
    "gatId" INTEGER NOT NULL,
    "cemiterioId" INTEGER NOT NULL,

    CONSTRAINT "gatinhoFalecido_pkey" PRIMARY KEY ("FalecidoId")
);

-- CreateTable
CREATE TABLE "cemiterio" (
    "cemiterioId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cemiterio_pkey" PRIMARY KEY ("cemiterioId")
);

-- CreateIndex
CREATE UNIQUE INDEX "cemiterio_userId_key" ON "cemiterio"("userId");

-- AddForeignKey
ALTER TABLE "gatinhoFalecido" ADD CONSTRAINT "gatinhoFalecido_gatId_fkey" FOREIGN KEY ("gatId") REFERENCES "gaturinha"("gatId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gatinhoFalecido" ADD CONSTRAINT "gatinhoFalecido_cemiterioId_fkey" FOREIGN KEY ("cemiterioId") REFERENCES "cemiterio"("cemiterioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cemiterio" ADD CONSTRAINT "cemiterio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
