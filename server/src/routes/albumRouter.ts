import { Router } from "express";

import AlbumController from "../controllers/AlbumController";
import { AlbumService } from "../services/albumService";

const albumRouter = Router();

const albumService = new AlbumService();
const albumController = new AlbumController(albumService);

albumRouter.get("/album/:userId", (req, res) => albumController.findAlbum(req, res));
albumRouter.post("/album/create", (req, res) => albumController.createAlbum(req, res));
albumRouter.post("/album/sell", (req, res) => albumController.sellAlbum(req, res));
albumRouter.post("/album/feed/:userId", (req, res) => albumController.feedCats(req, res));
albumRouter.get("/album/:userId/lastClickedDate", (req, res) => albumController.lastClick(req, res));
albumRouter.put("/album/:userId/UpdatelastClickedDate", (req, res) => albumController.updateLastClick(req, res));
albumRouter.post("/album/stick/:userId", (req, res) => albumController.stick(req, res));

export { albumRouter };
