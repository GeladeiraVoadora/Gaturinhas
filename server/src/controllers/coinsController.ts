import { ICoinService } from "../services/interfaces/ICoinService";

export default class CoinsController {
  constructor(private coinService: ICoinService) {}

  async addMoney(req: any, res: any) {
    console.log("Rota addMoney foi chamada"); // Log de teste
  
    try {
      const { userId } = req.params;
      const { money } = req.body;
      console.log("userId:", userId, "money:", money); // Verifique os valores recebidos
  
      const usuario = await this.coinService.addMoney(Number(userId), Number(money));
  
      if (!usuario) {
        console.log("Usuário não encontrado");
        return res.json({ error: "usuario não encontrado" });
      }
  
      return res.json(usuario);
    } catch (error) {
      console.log("Erro:", error); // Log de erro
      return res.json({ error });
    }
  }

  async updateLastClick(req: any, res: any) {
    try {
      const { userId } = req.params;
      const { click } = req.body;

      const success = await this.coinService.updateLastClick(Number(userId), new Date(click));

      return res.json({ success });
    } catch (error) {
      return res.json({ error });
    }
  }

  async getLastClick(req: any, res: any) {
    try {
      const { userId } = req.params;

      const click = await this.coinService.getLastClick(Number(userId));

      return res.json(click);
    } catch (error) {
      return res.json({ error });
    }
  }
}