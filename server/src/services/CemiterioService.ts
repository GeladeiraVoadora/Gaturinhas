import { PrismaClient, gaturinha } from '@prisma/client';
import { ICemiterioService } from "./interfaces/ICemiterioService";

const prisma = new PrismaClient();
export class CemiterioService implements ICemiterioService {
  
  async createGatinhoFalecido(userId: number, gatId: number): Promise<{ msg?: string; error?: string }> {
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

      const gaturinha =  await prisma.gaturinha.findUnique({where: {gatId}})
      
      // Adiciona um gatinho falecido ao cemitério
      await prisma.gatinhoFalecido.create({
        data: {
          gat: { connect: {gatId: Number(gatId)}},
          cemiterio: { connect: { cemiterioId: cemiterio.cemiterioId } },
          price: Number(gaturinha?.price)/3,
        },
      });

      return { msg: 'Gatinho falecido adicionado com sucesso!' };
    } catch (error) {
      console.error(error);
      return { error: 'Erro ao criar gatinho falecido.' };
    }
  }

  /**
   * Remove um gatinho do cemitério.
   */
  async removeToCemiterio(FalecidoId: number): Promise<boolean | { error: string }> {
    try {
      const gaturinha = await prisma.gatinhoFalecido.findFirst({
        where: { FalecidoId },
        include: cemiterio: {select: {useId: true}},
      });

      if (!gaturinha) {
        return { error: 'Gatinho não encontrado no cemitério.' };
      }

      const usuario = await prisma.usuario.findUnique({ where: { gaturinha.userId } });
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

      await prisma.gatinhoFalecido.delete({
        where: { FalecidoId},
      });

      return true;
    } catch (error) {
      console.error(error);
      return { error: 'Erro ao remover gatinho do cemitério.' };
    }
  }

  /**
   * Lista todos os gatinhos falecidos de um usuário.
   */
  async findAllGatinhosFalecidos(userId: number): Promise<any[]> {
    try {
      const cemiterio = await prisma.cemiterio.findUnique({
        where: { userId },
        include: {
          listaGats: {
            include: { gat: true },
          },
        },
      });

      if (!cemiterio) {
        throw new Error('Cemitério não encontrado.');
      }

      return cemiterio.listaGats.map((lista) => lista.gat);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
