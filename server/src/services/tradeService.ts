import { PrismaClient } from "@prisma/client";
import { ITradeService } from "./interfaces/ITradeService";

const prisma = new PrismaClient();

export class TradeService implements ITradeService {
  async findRepeated(invId: number): Promise<any[]> {
    const inventario = await prisma.inventario.findUnique({
      where: { invId },
      include: {
        gat_prod: {
          include: {
            gat: {
              select: {
                gatId: true,
                name: true,
                image: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!inventario) {
      throw new Error("Inventário não encontrado");
    }

    const gaturinhasGrouped = inventario.gat_prod.reduce((acc: any[], gp) => {
      const { gat } = gp; // Remova gatId daqui, pois ele já está incluído em gat
      const index = acc.findIndex((item) => item.gatId === gat.gatId);
      if (index !== -1) {
        acc[index].amount++;
        acc[index].prodIds.push(gp.prodId);
      } else {
        acc.push({ amount: 1, prodIds: [gp.prodId], ...gat });
      }
      return acc;
    }, []);

    return gaturinhasGrouped.filter((gaturinha) => gaturinha.amount >= 5);
  }

  async tradeCardsRandom(prodIds: number[], invId: number): Promise<any> {
    await prisma.gaturinha_product.deleteMany({
      where: {
        prodId: { in: prodIds.slice(0, 5) },
      },
    });

    const gatIds = await prisma.gaturinha.findMany({
      select: { gatId: true },
    });
    const randomGatId = gatIds[Math.floor(Math.random() * gatIds.length)].gatId;

    return await prisma.gaturinha_product.create({
      data: { gatId: randomGatId, invId },
    });
  }

  async tradeCardsEqual(prodIds: number[], invId: number): Promise<any> {
    const rarity = await prisma.gaturinha_product.findUnique({
      where: {
        prodId: prodIds[0],
      },
      include: {
        gat: {
          select: {
            type: true,
          },
        },
      },
    });

    if (!rarity) {
      throw new Error("Raridade não encontrada");
    }

    const newType =
      rarity.gat.type === "Common"
        ? "Rare"
        : rarity.gat.type === "Rare"
        ? "Epic"
        : rarity.gat.type === "Epic"
        ? "Legendary"
        : "ExodianCat";

    const gatIds = await prisma.gaturinha.findMany({
      where: { type: newType },
      select: { gatId: true },
    });
    const randomGatId = gatIds[Math.floor(Math.random() * gatIds.length)].gatId;

    return await prisma.gaturinha_product.create({
      data: { gatId: randomGatId, invId },
    });
  }
}
