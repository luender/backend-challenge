import { PrismaClient } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async register(data: any) {
    await this.prisma.user.create({
      data: {
        username: data.user,
        password: data.password,
      },
    });
  }

  async getUser(user: any): Promise<any> {
    const userAlready = await this.prisma.user.findFirst({
      where: {
        username: user,
      },
    });

    return userAlready;
  }
}
