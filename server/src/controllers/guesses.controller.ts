import prisma from "../lib/prisma";

export default class GuessesController {
  constructor() {
    
    this.count = this.count.bind(this);
  }

  async count(): Promise<{ count: number }> {
    const count = await prisma.guess.count();

    return {
      count
    }
  }
}