import { FastifyInstance, FastifyServerOptions } from "fastify";
import GuessesController from "../controllers/guesses.controller";

const guessesRoutes = (app: FastifyInstance, opts: FastifyServerOptions, done: Function) => {
  const guessesController = new GuessesController();
  app.get('/count', guessesController.count);

  done();
}

export default guessesRoutes;