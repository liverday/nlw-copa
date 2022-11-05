import prisma from '../lib/prisma';

export default class GamesController {
  constructor() {
    this.count = this.count.bind(this);
  }

  async count(): Promise<{ count: number }> {
    const count = await prisma.game.count();

    return {
      count
    }
  }
}