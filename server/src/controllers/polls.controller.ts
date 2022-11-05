import { Poll } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import ShortUniqueId from 'short-unique-id';
import { z } from 'zod';
import prisma from '../lib/prisma';

export default class PollsController {

  async store(request: FastifyRequest): Promise<Poll> {
    const createPollBody = z.object({
      title: z.string()
    })

    const { title } = createPollBody.parse(request.body)

    const generateCode = new ShortUniqueId({ length: 6 })

    let ownerId: string | null = null;

    try {
      await request.jwtVerify();

      ownerId = request.user.sub;
    } catch {}

    const data: any = {
      title,
      code: String(generateCode()).toUpperCase(),
      ownerId,
    }

    if (ownerId) {
      data.participants = {
        create: {
          userId: ownerId
        }
      }
    }

    const poll = await prisma.poll.create({
      data
    })

    return poll
  }

  async join(request: FastifyRequest, reply: FastifyReply) {
    const joinPollBody = z.object({
      code: z.string()
    })

    const { code } = joinPollBody.parse(request);

    const userId = request.user.sub;

    const poll = await prisma.poll.findUnique({
      where: {
        code
      },
      include: {
        participants: {
          where: {
            userId
          }
        }
      }
    })

    if (!poll) {
      return reply.status(404).send({ message: 'Poll not found' })
    }

    if (poll.participants.length > 0) {
      return reply.status(400).send({
        message: 'You already joined this poll.'
      })
    }

    if (!poll.ownerId) {
      await prisma.poll.update({
        where: {
          id: poll.id
        },
        data: {
          ownerId: userId
        }
      })
    }

    await prisma.participant.create({
      data: {
        pollId: poll.id,
        userId
      }
    })

    return reply.status(201).send();
  }

  async index(request: FastifyRequest): Promise<{ polls: Poll[] }> {
    const polls = await prisma.poll.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub
          }
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true
              }
            }  
          },
          take: 4,
        },
        _count: {
          select: {
            participants: true
          }
        }
      }
    });

    return {
      polls
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const getPollParams = z.object({
      id: z.string()
    })  

    const { id } = getPollParams.parse(request.params)

    const poll = await prisma.poll.findUnique({
      where: {
        id
      }
    })

    if (!poll) {
      return reply.status(404).send({
        message: 'Poll not found'
      })
    }

    return {
      poll
    }
  }

  async count(): Promise<{ count: number }> {
    const count = await prisma.poll.count();

    return {
      count
    }
  }
}