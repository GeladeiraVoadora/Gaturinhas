import prisma from "../prismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  // Criar usuário
  async createUsuario(email: string, password: string) {
    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 8);

    // Verificar se o usuário já existe
    let usuario = await prisma.usuario.findUnique({ where: { email } });
    if (usuario) throw new Error("Já existe usuário com essas credenciais");

    // Criar novo usuário
    usuario = await prisma.usuario.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Criar inventário para o usuário recém-criado
    const inv = await this.createInv(usuario.userId); // Usando a função auxiliar

    // Atualizar o usuário com o inventário criado
    await prisma.usuario.update({
      where: { userId: usuario.userId },
      data: { inv: { connect: { invId: inv.invId } } },
    });

    // Criar token JWT
    const token = jwt.sign({ userId: usuario.userId }, process.env.JWT_SECRET!);

    return { usuario, token };
  },

  // Login de usuário
  async login(email: string, password: string) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) throw new Error("Usuário não encontrado");

    const comparaSenha = await bcrypt.compare(password, usuario.password);
    if (!comparaSenha) throw new Error("Senha incorreta");

    const invId = await prisma.inventario.findUnique({
      where: { userId: usuario.userId },
    });
    if (!invId) throw new Error("Inventário não encontrado");

    const token = jwt.sign({ userId: usuario.userId }, process.env.JWT_SECRET!);

    return { token, usuario, invId: invId.invId };
  },

  // Achar todos os usuários
  async findAllUsuarios() {
    return await prisma.usuario.findMany();
  },

  // Achar um único usuário
  async findUsuario(userId: number) {
    const usuario = await prisma.usuario.findUnique({
      where: { userId },
    });
    if (!usuario) throw new Error("Usuário não encontrado");

    return usuario;
  },

  // Atualizar informações do usuário
  async updateUsuario(userId: number, data: { name?: string; email?: string; password?: string }) {
    let usuario = await prisma.usuario.findUnique({ where: { userId } });
    if (!usuario) throw new Error("Usuário não encontrado");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 8);
    }

    usuario = await prisma.usuario.update({
      where: { userId },
      data,
    });

    return usuario;
  },

  // Deletar usuário
  async deleteUsuario(userId: number) {
    const usuario = await prisma.usuario.findUnique({ where: { userId } });
    if (!usuario) throw new Error("Usuário não encontrado");

    await prisma.usuario.delete({ where: { userId } });
  },

  // Verificar saldo do usuário
  async findMoney(userId: number) {
    const usuario = await prisma.usuario.findUnique({
      where: { userId },
      select: { money: true },
    });
    if (!usuario) throw new Error("Usuário não encontrado");

    return usuario.money;
  },

  // Criar inventário (função auxiliar)
  async createInv(userId: number) {
    const invent = await prisma.inventario.create({
      data: {
        userId: Number(userId),
      },
    });

    return invent;
  },
};
