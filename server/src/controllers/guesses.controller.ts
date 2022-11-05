import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma";

export default class GuessesController {
  async store(request: FastifyRequest, reply: FastifyReply) {
    const createGuessParams = z.object({
      pollId: z.string(),
      gameId: z.string()
    });

    const createGuessBody = z.object({
      firstTeamGoals: z.number(),
      secondTeamGoals: z.number()
    })

    const { pollId, gameId } = createGuessParams.parse(request.params)
    const { firstTeamGoals, secondTeamGoals } = createGuessBody.parse(request.body)

    const participant = await prisma.participant.findUnique({
      where: {
        userId_pollId: {
          userId: request.user.sub,
          pollId: pollId
        }
      }
    })

    if (!participant) {
      return reply.status(400).send({
        message: "You're not allowed to create a guess inside this poll."
      })
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId
      }
    })

    if (!game) {
      return reply.status(404).send({
        message: 'Game not found'
      })
    }

    if (game.date < new Date()) {
      return reply.status(400).send({
        message: 'You cannot make guesses after the game date'
      })
    }

    const existingGuess = await prisma.guess.findUnique({
      where: {
        participantId_gameId: {
          participantId: participant.id,
          gameId
        }
      }
    })

    if (existingGuess) {
      return reply.status(400).send({
        message: "You can't make a guess twice on a game"
      })
    }

    await prisma.guess.create({
      data: {
        gameId,
        firstTeamGoals,
        secondTeamGoals,
        participantId: participant.id
      }
    })

    return reply.status(201).send();
  }

  async count(): Promise<{ count: number }> {
    const count = await prisma.guess.count();

    return {
      count
    }
  }
}