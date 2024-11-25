import { Router } from "express";

import usuarioController from "../controllers/usuarioController";

const usuarioRouter = Router();

usuarioRouter.post("/usuario", usuarioController.createUsuario);
usuarioRouter.get("/usuarios", usuarioController.findAllUsuarios);
usuarioRouter.get("/usuario/:userId", usuarioController.findUsuario);
usuarioRouter.put("/usuario/:userId", usuarioController.updateUsuario);
usuarioRouter.delete("/usuario/:userId", usuarioController.deleteUsuario);
usuarioRouter.get("/usuario/:userId/money", usuarioController.findMoney);

usuarioRouter.post("/login", usuarioController.login);

// amigos
usuarioRouter.post("/usuario/:userId/addFriend", usuarioController.addFriend);
usuarioRouter.post("/usuario/:userId/removeFriend", usuarioController.removeFriend);

export { usuarioRouter };
