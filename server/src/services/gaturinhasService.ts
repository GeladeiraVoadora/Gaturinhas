import { PrismaClient } from "@prisma/client";
import { IGaturinhaService } from "./interfaces/IGaturinhaService";
import { ICoinService } from "./interfaces/ICoinService";
import { CemiterioService } from "./CemiterioService";

const prisma = new PrismaClient();

export class GaturinhaService implements IGaturinhaService {
  private readonly coinService!: ICoinService;
  private readonly CemiterioService = new CemiterioService();

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

  async sellGaturinha(prodId: number, email: string): Promise<boolean | { error: string }> {
  try {
    const value = await prisma.gaturinha_product.findUnique({
      where: { prodId },
      include: { gat: { select: { gatId: true, price: true } } },
    });
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !value || !value.gat) {
      return { error: "Venda não autorizada. Verifique existência do usuário/gaturinha." };
    }

    const money = Math.floor(Number(value.gat.price) / 3);
    if (isNaN(money) || money <= 0) {
      return { error: "Erro no cálculo do valor. Verifique os dados do produto." };
    }

    // Then perform service calls
    await prisma.usuario.update({
      where: { userId:Number(usuario.userId) },
      data: {
        money: { increment: money },
      },
    });

    this.CemiterioService.createGatinhoFalecido(Number(usuario.userId), Number(value.gat.gatId));

    // Perform database operations first
    await prisma.gaturinha_product.delete({ where: { prodId } });

    return true;
  } catch (error) {
    console.error("Erro ao realizar a venda de gaturinha:", error);
    return { error: "Ocorreu um erro durante a operação. Por favor, tente novamente mais tarde." };
  }
}

}
