import { Router } from "express";

import InventarioController from "../controllers/InventarioController";
import stickerPackController from "../controllers/stickerPackController";
import { InventoryService } from "../services/inventoryService";

const inventoryService = new InventoryService();
const inventarioController = new InventarioController(inventoryService);

const inventarioRouter = Router();

//FIXME: da pra mudar de invId para userId
inventarioRouter.get("/inventario/:invId", (req, res) => inventarioController.findInv(req, res));
inventarioRouter.get("/inventario/Pac/:invId", stickerPackController.findInv);

export { inventarioRouter };