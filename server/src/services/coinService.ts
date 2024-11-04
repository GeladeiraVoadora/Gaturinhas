import { PrismaClient, usuario } from "@prisma/client";
import { ICoinService } from "./interfaces/ICoinService";

const prisma = new PrismaClient();

export class CoinsService implements ICoinService {
  async addMoney(userId: number, money: number): Promise<usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { userId },
    });

    if (!usuario) {
      return null;
    }

    return await prisma.usuario.update({
      where: { userId },
      data: {
        money: { increment: money },
      },
    });
  }

  async updateLastClick(userId: number, click: Date): Promise<boolean> {
    await prisma.usuario.update({
      where: { userId },
      data: { click: click.toISOString() },
    });
    return true;
  }

  async getLastClick(userId: number): Promise<{ click: Date } | null> {
    const result = await prisma.usuario.findUnique({
      where: { userId },
      select: { click: true },
    });

    if (result && result.click !== null) {
      return { click: new Date(result.click) };
    }

    return null;
  }
}