import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { chatMessageController, roomController } from "./dependencies";
import { userController } from "./dependencies";

const router = Router();

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post(
  "/sendMessage",
  authenticate,
  chatMessageController.sendMessage.bind(chatMessageController)
);
router.post(
  "/createRoom",
  authenticate,
  roomController.create.bind(roomController)
);

export { router };
