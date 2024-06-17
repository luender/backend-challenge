import { UserController } from "../controller/user";
import { UserService } from "../service/user";
import { ChatMessageService } from "../service/chatMessage";
import { ChatMessageController } from "../controller/chatMessage";
import { UserRepository } from "../repository/user";
import { PrismaClient } from "@prisma/client";
import { ChatMessageRepository } from "../repository/chatMessage";
import { RoomController } from "../controller/room";
import { RoomService } from "../service/room";
import { RoomRepository } from "../repository/room";

const prisma = new PrismaClient();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
export const userController = new UserController(userService);

const roomRepository = new RoomRepository(prisma);
const roomService = new RoomService(roomRepository, userRepository);
export const roomController = new RoomController(roomService);

const chatMessageRepository = new ChatMessageRepository(prisma);
const chatMessageService = new ChatMessageService(chatMessageRepository);
export const chatMessageController = new ChatMessageController(
  chatMessageService
);
