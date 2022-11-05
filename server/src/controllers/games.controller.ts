import { FastifyRequest } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma';

export default class GamesController {
  constructor() {
    this.count = this.count.bind(this);
  }

  async index(request: FastifyRequest) {
    const getGamesParams = z.object({
      id: z.string()
    })

    const { id } = getGamesParams.parse(request.params);

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              pollId: id
            }
          }
        }
      }
    })

    return {
      games: games.map(game => ({
        ...game,
        guess: game.guesses.length > 0 ? game.guesses[0] : null,
        guesses: undefined
      }))
    }
  }

  async count(): Promise<{ count: number }> {
    const count = await prisma.game.count();

    return {
      count
    }
  }
}