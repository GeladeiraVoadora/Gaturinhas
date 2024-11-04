import { PrismaClient, album, usuario } from "@prisma/client";
import { IAlbumService } from "./interfaces/IAlbumService";
import { AlbumType } from "../types/albumType";

const prisma = new PrismaClient();

export class AlbumService implements IAlbumService {
  async createAlbum(userId: number): Promise<album | null> {
    const existingAlbum = await prisma.album.findUnique({
      where: { userId },
    });
    if (existingAlbum) return null;

    return await prisma.album.create({
      data: { userId },
    });
  }

  async findAlbum(userId: number): Promise<AlbumType | null> {
    return await prisma.album.findUnique({
      where: { userId },
      include: {
        gat_prod: {
          include: {
            gat: {
              select: { name: true, image: true, type: true, desc: true },
            },
          },
        },
      },
    });
  }

  async sellAlbum(userId: number): Promise<usuario | null> {
    // Passo 1: Verifica se o álbum existe
    const album = await prisma.album.findUnique({
      where: { userId },
      select: { albumId: true, price: true },
    });

    if (!album) {
      throw new Error("Álbum não encontrado");
    }

    // Passo 2: Calcula a porcentagem de completude do álbum
    const completionRate = await this.calculateAlbumCompletionRate(album.albumId);

    // Passo 3: Determina o valor da venda com base na completude
    const sellValue = this.calculateSellValue(album.price, completionRate);

    if (sellValue === 0) {
      throw new Error("Álbum não possui gaturinhas suficientes para ser vendido");
    }

    // Passo 4: Atualiza o saldo do usuário
    const updatedUser = await prisma.usuario.update({
      where: { userId },
      data: {
        money: { increment: sellValue },
      },
    });

    // Passo 5: Exclui o álbum após a venda
    await prisma.album.delete({ where: { albumId: album.albumId } });

    return updatedUser;
  }

  // Método auxiliar para calcular a completude do álbum
  private async calculateAlbumCompletionRate(albumId: number): Promise<number> {
    const countGaturinhasAlbum = await prisma.gaturinha_product.count({
      where: { albumId },
    });
    const allGaturinhas = await prisma.gaturinha.count();

    return countGaturinhasAlbum / allGaturinhas;
  }

  // Método auxiliar para calcular o valor de venda com base na completude do álbum
  private calculateSellValue(price: number, completionRate: number): number {
    if (completionRate >= 0.9) return price;
    if (completionRate >= 0.8) return price * 0.8;
    if (completionRate >= 0.7) return price * 0.7;
    if (completionRate >= 0.6) return price * 0.6;
    if (completionRate >= 0.5) return price * 0.5;
    if (completionRate >= 0.4) return price * 0.4;
    if (completionRate >= 0.3) return price * 0.3;
    if (completionRate >= 0.2) return price * 0.2;
    if (completionRate >= 0.1) return price * 0.1;
    return 0; // Se o álbum estiver muito vazio, retorna 0
  }

  async feedCats(userId: number): Promise<void> {
    
    const album = await prisma.album.findUnique({
      where: { userId },
      select: { albumId: true },
    });

    if (!album) throw new Error("Álbum não encontrado");

    const userGaturinhasCount = await prisma.gaturinha_product.count({
      where: { albumId: album.albumId },
    });

    const totalGaturinhasCount = await prisma.gaturinha.count();

    const completionRate = userGaturinhasCount / totalGaturinhasCount;
    const incrementValue = this.calculateSellValue(200, completionRate);

    if (incrementValue === 0) {
      throw new Error("Número insuficiente de gaturinhas para alimentar os gatos");
    }

    await prisma.album.update({
      where: { albumId: album.albumId },
      data: {
        price: { increment: incrementValue },
      },
    });
  }

  async updateLastClick(userId: number, catFed: boolean): Promise<boolean> {
    const result = await prisma.album.update({
      where: { userId },
      data: { catFed: catFed ? "true" : "false" }, // Converte booleano para string
    });
    return result ? true : false;
  }

  async lastClick(userId: number): Promise<{ catFed: string | null } | null> {
    const result = await prisma.album.findUnique({
      where: { userId },
      select: { catFed: true },
    });
    
    return result;
  }

  async stick(userId: number, prodId: number): Promise<boolean> {
    const album = await prisma.album.findUnique({ where: { userId } });
    if (!album) return false;

    await prisma.gaturinha_product.update({
      where: { prodId },
      data: {
        invId: null,
        albumId: album.albumId,
      },
    });

    return true;
  }
}
