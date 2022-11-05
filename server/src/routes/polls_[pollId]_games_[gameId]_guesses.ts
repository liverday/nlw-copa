import { FastifyInstance } from "fastify";
import GuessesController from "../controllers/guesses.controller";
import { authenticate } from "../plugins/authenticate";

const routes = async (app: FastifyInstance) => {
  const guessesController = new GuessesController();
  app.post('/', {
    onRequest: [authenticate]
  }, guessesController.store)
}

export default routes;