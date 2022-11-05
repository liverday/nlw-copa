import { Poll } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import ShortUniqueId from 'short-unique-id';
import { z } from 'zod';
import prisma from '../lib/prisma';

export default class PollsController {

  constructor() {
    this.store = this.store.bind(this);
    this.index = this.index.bind(this);
    this.count = this.count.bind(this);
  }

  async store(request: FastifyRequest): Promise<Poll> {
    const createPollBody = z.object({
      title: z.string()
    })

    const { title } = createPollBody.parse(request.body)

    const generateCode = new ShortUniqueId({ length: 6 })

    const poll = await prisma.poll.create({
      data: {
        title,
        code: String(generateCode()).toUpperCase()
      }
    })

    return poll
  }

  async index(): Promise<{ polls: Poll[] }> {
    const polls = await prisma.poll.findMany();

    return {
      polls
    }
  }

  async count(): Promise<{ count: number }> {
    const count = await prisma.poll.count();

    return {
      count
    }
  }
}