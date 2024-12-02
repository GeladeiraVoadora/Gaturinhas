import { Router } from "express";
import { ExodiaController } from "../controllers/exodiaController";

const exodiaRouter = Router();

const exodiaController = new ExodiaController();

exodiaRouter.get("/exodia/progress/:userId", (req, res) => exodiaController.getProgress(req, res));
exodiaRouter.post("/exodia/complete/:userId", (req, res) => exodiaController.complete(req, res));

export { exodiaRouter }; 