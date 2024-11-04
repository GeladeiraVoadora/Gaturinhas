import { Router } from "express";

import GatexController from "../controllers/gatexController";
import { GatexService } from "../services/gatexService";

const gatexRouter = Router();

const gatexService  = new GatexService();
const gatexController = new GatexController(gatexService);

gatexRouter.get("/gatex", (req, res) =>  gatexController.findAllGaturinhas(req, res));

export { gatexRouter };