import GaturinhasController from "../controllers/gaturinhasController";
import { GaturinhaService } from "../services/gaturinhasService";
import { Router } from "express";

const gaturinhasRouter = Router();

const gaturinhaService = new GaturinhaService();
const gaturinhasController = new GaturinhasController(gaturinhaService);

gaturinhasRouter.post("/gaturinha/:userId", (req, res) => gaturinhasController.createGaturinha(req, res));
gaturinhasRouter.post("/compra", (req, res) => gaturinhasController.createCompra(req, res));
gaturinhasRouter.post("/sell", (req, res) => gaturinhasController.sellGaturinha(req,res));

export { gaturinhasRouter };