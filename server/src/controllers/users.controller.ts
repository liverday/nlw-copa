import prisma from '../lib/prisma';

export default class UsersController {
  constructor() {
    this.count = this.count.bind(this);
  }

  async count(): Promise<{ count: number }> {
    const count = await prisma.user.count();

    return {
      count
    }
  }
}