import { FastifyInstance, FastifyServerOptions } from "fastify";
import GamesController from "../controllers/games.controller";

const gamesRoutes = (app: FastifyInstance, opts: FastifyServerOptions, done: Function) => {
  const gamesController = new GamesController();
  app.get('/count', gamesController.count);

  done();
}

export default gamesRoutes;