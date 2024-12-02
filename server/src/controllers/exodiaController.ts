import { ExodiaService } from "../services/exodiaService";

export class ExodiaController {
  private exodiaService: ExodiaService; // Declare a propriedade explicitamente

  constructor() {
    this.exodiaService = new ExodiaService();
  }

  // Endpoint para verificar o progresso do Exodia
  async getProgress(req: any, res: any): Promise<void> {
    const { userId } = req.params;

    try {
      const progress = await this.exodiaService.checkProgress(parseInt(userId, 10));
      res.status(200).json(progress);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Endpoint para completar o Exodia
  async complete(req: any, res: any): Promise<void> {
    const { userId } = req.params;

    try {
      const result = await this.exodiaService.completeExodia(parseInt(userId, 10));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
