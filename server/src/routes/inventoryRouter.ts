import { Router } from "express";

import InventarioController from "../controllers/inventoryController";
import stickerPackController from "../controllers/stickerPackController";
import { InventoryService } from "../services/inventoryService";

const inventoryService = new InventoryService();
const inventarioController = new InventarioController(inventoryService);

const inventoryRouter = Router();

//FIXME: da pra mudar de invId para userId
inventoryRouter.get("/inventario/:invId", (req, res) => inventarioController.findInv(req, res));
inventoryRouter.get("/inventario/Pac/:invId", stickerPackController.findInv);

export { inventoryRouter };