import { FastifyInstance } from "fastify";
import PollsController from "../controllers/polls.controller";

const pollsRoutes = async (app: FastifyInstance) => {
  const pollsController = new PollsController();

  app.post('/', pollsController.store)
  app.get('/', pollsController.index)
  app.get('/count', pollsController.count);
}

export default pollsRoutes;