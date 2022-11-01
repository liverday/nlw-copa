import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query']
});

async function start() {
  const port = Number(process.env.PORT) || 3000
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();

    return {
      count
    }
  });

  fastify.get('/pools', async () => {
    const pools = await prisma.pool.findMany();

    return {
      pools
    }
  })

  await fastify.listen({
    port,
    host: '0.0.0.0'
  });
}

start();