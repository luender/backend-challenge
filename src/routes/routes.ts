import { Router } from "express";
import { UserController } from "../controller/user";
import { UserService } from "../service/user";
import { authenticate } from "../middleware/authenticate";
import { ChatMessageService } from "../service/chatMessage";
import { ChatMessageController } from "../controller/chatMessage";

const userService = new UserService();
const userController = new UserController(userService);

const chatMessageService = new ChatMessageService();
const chatMessageController = new ChatMessageController(chatMessageService);

const router = Router();

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post(
  "/sendMessage",
  authenticate,
  chatMessageController.sendMessage.bind(chatMessageController)
);

export { router };
