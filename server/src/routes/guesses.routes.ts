import { FastifyInstance } from "fastify";
import GuessesController from "../controllers/guesses.controller";

const guessesRoutes = async (app: FastifyInstance) => {
  const guessesController = new GuessesController();
  app.get('/count', guessesController.count);
}

export default guessesRoutes;