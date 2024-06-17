import { PrismaClient } from "@prisma/client";
import { Room } from "../types/room";

export class RoomRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Room) {
    await this.prisma.room.create({
      data: {
        user: data.user,
        room: data.room,
      },
    });
  }

  async getRoom(data: Pick<Room, "room">) {
    const roomAlready = this.prisma.room.findFirst({
      where: {
        room: data.room,
      },
    });

    return roomAlready;
  }
}
