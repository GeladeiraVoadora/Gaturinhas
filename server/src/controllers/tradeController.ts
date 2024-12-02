import { ITradeService } from "../services/interfaces/ITradeService";

export default class TradeController {
  constructor(private tradeService: ITradeService) {}

  async findRepeated(req: any, res: any) {
    try {
      const { invId } = req.params;
      const result = await this.tradeService.findRepeated(Number(invId));
      return res.json(result);
    } catch (error) {
      return res.json({ error });
    }
  }


  async tradeCardsRandom(req: any, res: any) {
    try {
      const { prodIds, invId } = req.body;
      if (!prodIds || !Array.isArray(prodIds) || prodIds.length === 0) {
        return res.json({ error: "Array inválido ou vazio" });
      }

      const result = await this.tradeService.tradeCardsRandom(prodIds, Number(invId));
      return res.json(result);
    } catch (error) {
      return res.json({ error });
    }
  }

  async tradeCardsEqual(req: any, res: any) {
    try {
      const { prodIds, invId } = req.body;
      if (!prodIds || !Array.isArray(prodIds) || prodIds.length === 0) {
        return res.json({ error: "Array inválido ou vazio" });
      }

      const result = await this.tradeService.tradeCardsEqual(prodIds, Number(invId));
      return res.json(result);
    } catch (error) {
      return res.json({ error });
    }
  },

  //TODO: Trade with friends
};
