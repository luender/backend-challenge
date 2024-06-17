import { PrismaClient } from "@prisma/client";
import { Message } from "../types/message";

export class ChatMessageRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async saveMessage(data: Message) {
    const { user, message, room } = data;
    await this.prisma.message.create({
      data: {
        room: room || "",
        content: message,
        username: user,
      },
    });
  }
}
