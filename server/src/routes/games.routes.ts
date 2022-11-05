import { FastifyInstance } from "fastify";
import GamesController from "../controllers/games.controller";

const gamesRoutes = async (app: FastifyInstance) => {
  const gamesController = new GamesController();
  app.get('/count', gamesController.count);
}

export default gamesRoutes;