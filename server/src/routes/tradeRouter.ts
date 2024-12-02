import TradeController from "../controllers/tradeController";
import { TradeService } from "../services/tradeService";
import { Router } from "express";

const tradeRouter = Router();

const tradeService = new TradeService();
const tradeController = new TradeController(tradeService);

tradeRouter.get("/trade/:invId", (req, res) => tradeController.findRepeated(req, res));
tradeRouter.post("/tradeCards", (req, res) => tradeController.tradeCardsRandom(req, res));
tradeRouter.post("/tradeCards/equal", (req, res) => tradeController.tradeCardsEqual(req, res))

export { tradeRouter };