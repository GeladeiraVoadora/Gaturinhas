import { PrismaClient } from "@prisma/client";
import { IGaturinhaService } from "./interfaces/IGaturinhaService";

const prisma = new PrismaClient();

export class GaturinhaService implements IGaturinhaService {

  async createGaturinha(userId: number, data: any): Promise<{ msg?: string; error?: string }> {
    const { name, image, price, type, desc } = data;

    const existingGat = await prisma.gaturinha.findUnique({ where: { image } });
    if (existingGat) {
      return { error: "já existe essa gaturinha" };
    }

    const usuario = await prisma.usuario.findUnique({ where: { userId } });
    if (!usuario) {
      return { error: "usuário não encontrado" };
    }

    let newMoney;
    const typeCost: Record<string, number> = {
      "Common": 20,
      "Rare": 100,
      "Epic": 150,
      "Legendary": 500,
    };
    const cost = typeCost[type];

    if (!cost || usuario.money < cost) {
      return { error: "Saldo insuficiente ou tipo inválido" };
    }

    newMoney = usuario.money - cost;
    await prisma.usuario.update({
      where: { userId },
      data: { money: newMoney },
    });

    await prisma.gaturinha.create({
      data: {
        name,
        image,
        price,
        type,
        desc,
      },
    });

    return { msg: "Gaturinha Criada" };
  }

  async createCompra(gatId: number, email: string): Promise<boolean | { error: string }> {
    const value = await prisma.gaturinha.findUnique({
      where: { gatId },
      select: { price: true },
    });
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !value || value.price > usuario.money) {
      return { error: "Compra não autorizada. Verifique saldo e existência do usuário/gaturinha." };
    }

    const inventario = await prisma.inventario.findUnique({ where: { userId: usuario.userId } });
    if (!inventario) {
      return { error: "Inventário não encontrado" };
    }

    await prisma.gaturinha_product.create({
      data: { gatId, invId: inventario.invId },
    });

    const newMoney = usuario.money - value.price;
    await prisma.usuario.update({
      where: { email },
      data: { money: newMoney },
    });

    return true;
  }

  sellGaturinha(prodId: number): Promise<boolean | { error: string; }> {
    throw new Error("Method not implemented.");
  }

  addToCemiterio(gatId: number): Promise<boolean | { error: string; }> {
    throw new Error("Method not implemented.");
  }
  
  ressuscitaGaturinha(gatId: number, email: string): Promise<boolean | { error: string; }> {
    throw new Error("Method not implemented.");
  }
}
