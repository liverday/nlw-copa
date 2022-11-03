import { Pool, PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import ShortUniqueId from 'short-unique-id';
import { z } from 'zod';


export default class PoolsController {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query']
    });

    this.store = this.store.bind(this);
    this.index = this.index.bind(this);
    this.count = this.count.bind(this);
  }

  async store(request: FastifyRequest): Promise<Pool> {
    const createPoolBody = z.object({
      title: z.string()
    })

    const { title } = createPoolBody.parse(request.body)

    const generateCode = new ShortUniqueId({ length: 6 })

    const pool = await this.prisma.pool.create({
      data: {
        title,
        code: String(generateCode()).toUpperCase()
      }
    })

    return pool
  }

  async index(): Promise<{ pools: Pool[] }> {
    const pools = await this.prisma.pool.findMany();

    return {
      pools
    }
  }

  async count(): Promise<{ count: number }> {
    const count = await this.prisma.pool.count();

    return {
      count
    }
  }
}