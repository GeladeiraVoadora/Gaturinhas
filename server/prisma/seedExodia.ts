import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedExodia() {
  try {
    // 1. Inserir as cartas do Exodia (se ainda não existirem)
    const exodiaCards = [
      { name: 'Exodia the Forbidden One', image: 'image_url_1', price: 1000, type: 'Monster', desc: 'Exodia the Forbidden One description' },
      { name: 'Left Arm of the Forbidden One', image: 'image_url_2', price: 500, type: 'Monster', desc: 'Left Arm description' },
      { name: 'Right Arm of the Forbidden One', image: 'image_url_3', price: 500, type: 'Monster', desc: 'Right Arm description' },
      { name: 'Left Leg of the Forbidden One', image: 'image_url_4', price: 500, type: 'Monster', desc: 'Left Leg description' },
      { name: 'Right Leg of the Forbidden One', image: 'image_url_5', price: 500, type: 'Monster', desc: 'Right Leg description' },
    ];

    // Verifica se as cartas já existem para evitar duplicação
    for (const card of exodiaCards) {
      await prisma.gaturinha.upsert({
        where: { name: card.name },
        update: {}, // Não altera nada se a carta já existir
        create: card, // Cria a carta caso ela não exista
      });
    }

    console.log('Cartas Exodia inseridas com sucesso.');

    // 2. Associar as cartas ao Exodia do usuário
    const userId = 1; // Insira o userId real aqui

    // Verificar se o Exodia já existe para o usuário
    const exodia = await prisma.exodia.findFirst({
      where: { userId }, // Buscar o Exodia para o usuário pelo userId
      include: { gaturinhas: true },
    });

    if (!exodia) {
      console.log("Exodia não encontrado para o usuário.");
      return;
    }

    // O exodiaId será utilizado como identificador único
    const exodiaId = exodia.exodiaId;

    // Buscar as cartas Exodia já inseridas
    const exodiaCardsInserted = await prisma.gaturinha.findMany({
      where: {
        name: {
          in: [
            'Exodia the Forbidden One',
            'Left Arm of the Forbidden One',
            'Right Arm of the Forbidden One',
            'Left Leg of the Forbidden One',
            'Right Leg of the Forbidden One',
          ],
        },
      },
    });

    // Associar as cartas com o Exodia
    await prisma.exodia.update({
      where: { exodiaId },
      data: {
        gaturinhas: {
          connect: exodiaCardsInserted.map((card) => ({ gatId: card.gatId })),
        },
      },
    });

    console.log('Cartas do Exodia associadas com sucesso ao Exodia do usuário.');
  } catch (error) {
    console.error('Erro ao seedar Exodia:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a função seed
seedExodia();
