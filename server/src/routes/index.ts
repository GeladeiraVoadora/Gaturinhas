import { Router } from "express";
import { inventoryRouter } from "./inventoryRouter";
import { gatexRouter } from "./gatexRouter";
import { albumRouter } from "./albumRouter";
import { coinsRouter } from "./coinsRouter";
import { gaturinhasRouter } from "./gaturinhasRouter";
import { pacRouter } from "./stickerPackRoute"
// import { tradeRouter } from "./tradeRoute"
import { usuarioRouter } from "./usuarioRoutes";
import { cemiterioRouter } from "./CemiterioRouter";
import { exodiaRouter } from "./exodiaRouter";

const mainRouter = Router();

mainRouter.use("/api", inventoryRouter);
mainRouter.use("/api", gatexRouter);
mainRouter.use("/api", coinsRouter);
mainRouter.use("/api", albumRouter);
mainRouter.use("/api", gaturinhasRouter);
mainRouter.use("/api", pacRouter);
// mainRouter.use("/api", tradeRouter);
mainRouter.use("/api", usuarioRouter);
mainRouter.use("/api", cemiterioRouter)
mainRouter.use("/api", exodiaRouter)

export default mainRouter;