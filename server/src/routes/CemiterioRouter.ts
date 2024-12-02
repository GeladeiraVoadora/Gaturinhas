import CemiterioController from "../controllers/CemiterioController";
import { CemiterioService } from "../services/CemiterioService";
import { Router } from "express";

const cemiterioRouter = Router();

const cemiterioService = new CemiterioService();
const cemiterioController = new CemiterioController(cemiterioService);

cemiterioRouter.get("/cemiterio/:userId", (req, res) => cemiterioController.findAllGatinhosFalecidos(req, res));
cemiterioRouter.post("/reviver", (req, res) => cemiterioController.removeToCemiterio(req, res));

export { cemiterioRouter };