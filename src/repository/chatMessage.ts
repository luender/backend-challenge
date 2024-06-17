import { PrismaClient } from "@prisma/client";

export class ChatMessageRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async saveMessage(data: any) {
    const { user, message, room } = data;
    await this.prisma.message.create({
      data: {
        channel: room || "",
        content: message,
        username: user,
      },
    });
  }
}
