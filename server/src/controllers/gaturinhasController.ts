import { IGaturinhaService } from "../services/interfaces/IGaturinhaService";

export default class GaturinhasController {
  constructor(private readonly gaturinhaService: IGaturinhaService) {}

  async createGaturinha(req: any, res: any) {
    const { userId } = req.params;
    const result = await this.gaturinhaService.createGaturinha(Number(userId), req.body);

    if (result.error) {
      return res.json({ error: result.error });
    }

    return res.json({ msg: result.msg });
  }

  async createCompra(req: any, res: any) {
    try {
      const { gatId, email } = req.body;
      const result = await this.gaturinhaService.createCompra(gatId, email);
      if (typeof result === "boolean" && result === true) {
        return res.json(true);
      }
    } catch (error) {
      return res.json({ error });
    }
  }

  async sellGaturinha(req: any, res: any){
    try{
      const {prodId, email} = req.body;
      const result = await this.gaturinhaService.sellGaturinha(prodId, email);
      if (typeof result === "boolean" && result === true){
        return res.json(true);
      }
    }catch(error){
      return res.json({ error});
    }
  }
}
