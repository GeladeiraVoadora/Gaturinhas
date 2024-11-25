import usuarioService from "../services/usuarioService";

// Funções para a tabela usuário
export default {
  // Criar usuário
  async createUsuario(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const result = await usuarioService.createUsuario(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Login de usuário
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const result = await usuarioService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      console.log(error)
    }
  },

  // Achar todos os usuários
  async findAllUsuarios(req: any, res: any) {
    try {
      const usuarios = await usuarioService.findAllUsuarios();
      res.json(usuarios);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Achar um único usuário
  async findUsuario(req: any, res: any) {
    try {
      const userId = Number(req.params.userId);
      const usuario = await usuarioService.findUsuario(userId);
      res.json(usuario);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Atualizar informações do usuário
  async updateUsuario(req: any, res: any) {
    try {
      const userId = Number(req.params.userId);
      const result = await usuarioService.updateUsuario(userId, req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar usuário
  async deleteUsuario(req: any, res: any) {
    try {
      const userId = Number(req.params.userId);
      await usuarioService.deleteUsuario(userId);
      res.json({ message: "Usuário deletado!" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Verificar saldo do usuário
  async findMoney(req: any, res: any) {
    try {
      const userId = Number(req.params.userId);
      const money = await usuarioService.findMoney(userId);
      res.json({ money });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};