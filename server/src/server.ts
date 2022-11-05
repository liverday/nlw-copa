import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import mainRoutes from './routes';
import jwt from '@fastify/jwt';

async function start() {
  const port = Number(process.env.PORT) || 3000
  const host = process.env.HOST || '0.0.0.0'
  const secret: string = process.env.JWT_SECRET!
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true
  });

  await fastify.register(jwt, {
    secret
  });

  await fastify.register(mainRoutes);

  await fastify.listen({
    port,
    host
  });
}

start();