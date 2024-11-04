import { IGatexService } from "../services/interfaces/IGatexService";

export default class GatexController {
  constructor(private gaturinhaService: IGatexService) {}

  async findAllGaturinhas(req: any, res: any) {
    try {
      const gaturinhas = await this.gaturinhaService.findAll();
      return res.json(gaturinhas);
    } catch (error) {
      return res.json({ error });
    }
  }
}