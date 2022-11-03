import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import mainRoutes from './routes';

async function start() {
  const port = Number(process.env.PORT) || 3000
  const host = process.env.HOST || '0.0.0.0'
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(mainRoutes);

  await fastify.listen({
    port,
    host
  });
}

start();