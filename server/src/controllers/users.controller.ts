import { PrismaClient } from "@prisma/client";

export default class UsersController {
  private prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient({ 
      log: ['query']
    });
    
    this.count = this.count.bind(this);
  }

  async count(): Promise<{ count: number }> {
    const count = await this.prisma.user.count();

    return {
      count
    }
  }
}