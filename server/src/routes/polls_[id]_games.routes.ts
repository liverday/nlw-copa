import { FastifyInstance } from "fastify";
import GamesController from "../controllers/games.controller";
import { authenticate } from "../plugins/authenticate";

const gamesRoutes = async (app: FastifyInstance) => {
  const gamesController = new GamesController();
  app.get('/count', gamesController.count);
  app.get('/', {
    onRequest: [authenticate]
  }, gamesController.index);
}

export default gamesRoutes;