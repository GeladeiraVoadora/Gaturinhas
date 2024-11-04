// inventário do usuário (Pacotes e figurinhas. Talvez moedas no front)
import { IInventoryService } from "../services/interfaces/IInventoryService";
import { Inventory } from "../types/inventoryType";

export default class InventarioController {
  constructor(private inventoryService: IInventoryService) {}

  async findInv(req: any, res: any) {
    try {
      const { invId } = req.params;
      
      const inventario = await this.inventoryService.findInventoryById(Number(invId)) as Inventory;

      if (!inventario) {
        return res.json({ error: "inventário não encontrado" });
      }

      const gaturinhas = inventario.gat_prod.map((gp) => ({
        prodId: gp.prodId,
        ...gp.gat,
      }));

      return res.json(gaturinhas);
    } catch (error) {
      return res.json({ error });
    }
  }
}
