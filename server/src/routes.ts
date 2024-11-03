import { Router } from "express";
import { inventarioRouter } from "./routes/inventarioRoutes";

const mainRouter = Router();

mainRouter.use("/api", inventarioRouter);

export default mainRouter;