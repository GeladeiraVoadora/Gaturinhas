import prisma from "../prismaClient"; // Certifique-se de importar o Prisma Client corretamente

export class ExodiaService {
  // Verifica o progresso do Exodia de um usuário
  async checkProgress(userId: number) {
    // Verifica se o usuário tem um inventário
    const userInventory = await prisma.inventario.findUnique({
      where: { userId },
      include: { gat_prod: { include: { gat: true } } },
    });

    console.log(userInventory);

    if (!userInventory) throw new Error("Inventário não encontrado para o usuário.");

    // GatIds das cartas do Exodia
    const exodiaCardIds = [22, 23, 24, 25, 26]; // Os gatId das cartas do Exodia

    // Obtenha os gatId das cartas que o usuário já coletou
    const collectedCardIds = userInventory.gat_prod
      .filter((gp) => exodiaCardIds.includes(gp.gatId)) // Filtra apenas as cartas do Exodia
      .map((gp) => gp.gatId);

    // Verifique se o usuário tem todas as cartas do Exodia no inventário
    const missingCards = exodiaCardIds.filter((gatId) => !collectedCardIds.includes(gatId));

    return {
      collectedCardIds, // Agora contém apenas as cartas do Exodia
      missingCards,
      completed: missingCards.length === 0, // Exodia está completo se não houver cartas faltando
    };
  }

  // Completa o Exodia para um usuário
  async completeExodia(userId: number) {
    const progress = await this.checkProgress(userId);

    if (!progress.completed) {
      throw new Error("O Exodia não está completo. Ainda há cartas faltando.");
    }

    // Verifica se o Exodia já foi completado, para adicionar as moedas apenas uma vez
    const album = await prisma.album.findUnique({
      where: { userId },
    });

    if (album?.exodiaCompleted) {
      return { message: "Exodia já foi completado. Moedas não serão adicionadas novamente.", status: false };
    }

    // Atualiza o exodiaCompleted para true e adiciona 1000 moedas ao usuário
    await prisma.album.update({
      where: { userId },
      data: { exodiaCompleted: true },
    });

    // Adicionar 1000 moedas ao usuário
    await prisma.usuario.update({
      where: { userId },
      data: { money: { increment: 1000 } }, // Incrementa 1000 moedas
    });

    return { message: "Exodia completado com sucesso e 1000 moedas adicionadas!", status: true };
  }
}
