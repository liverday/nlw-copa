import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path from 'path';

export default async function mainRoutes(app: FastifyInstance) {
  const promises = fs.readdirSync(__dirname)
    .filter(fileName => fileName !== 'index.ts')
    .map(async (fileName) => {
      const [prefix] = fileName.split('.');
      const parsedPrefix = prefix
        .replace(/\[(.*?)\]/g, (match) => {
          return `:${match.split(/\[|\]/).filter(Boolean)[0]}`
        })
        .replace(/_/g, '/')

      const plugin = await import(path.resolve(__dirname, fileName))
      app.register(plugin, { prefix: parsedPrefix })
    });

  await Promise.all(promises);
}