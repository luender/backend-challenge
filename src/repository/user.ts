import { PrismaClient } from "@prisma/client";
import { User } from "../types/user";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async register(data: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        user: data.user,
        password: data.password,
      },
    });
  }

  async getUser(user: Partial<User>): Promise<User | null> {
    const userAlready = await this.prisma.user.findFirst({
      where: {
        user: user.user,
      },
    });

    return userAlready;
  }
}
