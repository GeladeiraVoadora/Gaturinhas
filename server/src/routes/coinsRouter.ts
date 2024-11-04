import { Router } from "express";

import CoinsController from "../controllers/coinsController";
import { CoinsService } from "../services/coinService";

const coinService = new CoinsService();
const coinController = new CoinsController(coinService);

const coinsRouter = Router();

coinsRouter.put("/coins/daily/:userId", (req, res) => coinController.addMoney(req, res));
coinsRouter.get("/coins/daily/:userId/lastClickedDate", (req, res) => coinController.getLastClick(req, res));
coinsRouter.put("/coins/daily/:userId/UpdatelastClickedDate", (req, res) => coinController.updateLastClick(req, res));

coinsRouter.put("/test-put/:userId", (req, res) => {
  const { userId } = req.params;
  const { money } = req.body;
  res.json({ userId, money });
});

export { coinsRouter };
