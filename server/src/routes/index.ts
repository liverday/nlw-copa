import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path from 'path';

export default async function mainRoutes(app: FastifyInstance) {
  const promises = fs.readdirSync(__dirname)
    .filter(fileName => fileName !== 'index.ts')
    .map(async (fileName) => {
      const [prefix] = fileName.split('.');
      const plugin = await import(path.resolve(__dirname, fileName))
      app.register(plugin, { prefix })
    });

  await Promise.all(promises);
}