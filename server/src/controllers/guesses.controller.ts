import { PrismaClient } from "@prisma/client";

export default class GuessesController {
  private prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient({
      log: ['query']
    });
    
    this.count = this.count.bind(this);
  }

  async count(): Promise<{ count: number }> {
    const count = await this.prisma.guess.count();

    return {
      count
    }
  }
}