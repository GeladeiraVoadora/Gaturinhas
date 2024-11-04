import { Router } from "express";
import stickerPackController from "../controllers/stickerPackController";
// import DailyPController from "../controllers/StickerPackController";

const pacRouter = Router();

pacRouter.post("/compra/Pac", stickerPackController.createCompraPac);
pacRouter.get("/stickerPackStore",stickerPackController.findAllpackages );
pacRouter.post("/openpack", stickerPackController.openPack);
pacRouter.post("/openAllPacks", stickerPackController.openAllPacks);

// Daily Sticker Pack
pacRouter.put("/dailyP/:invId", stickerPackController.getPackage);
pacRouter.get("/dailyP/:userId/lastClickedDate", stickerPackController.lastClick)
pacRouter.put("/dailyP/:userId/UpdatelastClickedDate", stickerPackController.updateLastClick)

export { pacRouter };