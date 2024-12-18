import { PrismaClient, gaturinha } from '@prisma/client';
import { ICemiterioService } from "./interfaces/ICemiterioService";

const prisma = new PrismaClient();
export class CemiterioService implements ICemiterioService {
  async findAllGatinhosFalecidos(userId: number): Promise<any> {
    try {
      const cemiterio = await prisma.cemiterio.findUnique({
        where: { userId },
        select: {
          listaGats: {},
        },
      });
      console.log(cemiterio)

      if (!cemiterio) {
        throw new Error("Cemitério não encontrado.");
      }

      return cemiterio;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async createGatinhoFalecido(
    userId: number,
    gatId: number
  ): Promise<{ msg?: string; error?: string }> {
    try {
      // Criação do cemitério se não existir para o usuário
      let cemiterio = await prisma.cemiterio.findUnique({ where: { userId } });
      if (!cemiterio) {
        cemiterio = await prisma.cemiterio.create({
          data: {
            user: { connect: { userId } },
          },
        });
      }

      const gaturinha = await prisma.gaturinha.findUnique({ where: { gatId } });

      // Adiciona um gatinho falecido ao cemitério
      await prisma.gatinhoFalecido.create({
        data: {
          gat: { connect: { gatId: Number(gatId) } },
          cemiterio: { connect: { cemiterioId: cemiterio.cemiterioId } },
          price: Math.floor(Number(gaturinha?.price) / 3),
        },
      });

      return { msg: "Gatinho falecido adicionado com sucesso!" };
    } catch (error) {
      console.error(error);
      return { error: "Erro ao criar gatinho falecido." };
    }
  }

  /**
   * Remove um gatinho do cemitério.
   */
  async removeToCemiterio(
    falecidoId: number
  ): Promise<boolean | { error: string }> {
    try {
      console.log(falecidoId)
      const gaturinha = await prisma.gatinhoFalecido.findFirst({
        where: { falecidoId },
        include: { cemiterio: { select: { user: true } } },
      });

      if (!gaturinha) {
        return { error: "Gatinho não encontrado no cemitério." };
      }

      const usuario = await prisma.usuario.findUnique({
        where: { userId: gaturinha.cemiterio.user.userId },
      });
      if (!usuario) {
        return { error: "usuário não encontrado" };
      }

      const cost = gaturinha.price;

      if (!cost || usuario.money < cost) {
        return { error: "Saldo insuficiente ou tipo inválido" };
      }

      const inventario = await prisma.inventario.findUnique({
        where: { userId: usuario.userId },
      });
      if (!inventario) {
        return { error: "Inventário não encontrado" };
      }

      await prisma.gaturinha_product.create({
        data: { gatId: gaturinha.gatId, invId: inventario.invId },
      });

      const newMoney = usuario.money - cost;
      await prisma.usuario.update({
        where: { email: usuario.email },
        data: { money: newMoney },
      });

      await prisma.gatinhoFalecido.delete({where:{falecidoId: gaturinha.falecidoId}})

      return true;
    } catch (error: any) {
      console.error(error);
      return { error: "Erro ao remover gatinho do cemitério." };
    }
  }
}
