import { FastifyInstance } from "fastify";
import PollsController from "../controllers/polls.controller";
import { authenticate } from "../plugins/authenticate";

const pollsRoutes = async (app: FastifyInstance) => {
  const pollsController = new PollsController();

  app.post('/', pollsController.store)
  
  app.get('/', {
    onRequest: [authenticate]
  }, pollsController.index)

  app.get('/:id', {
    onRequest: [authenticate]
  }, pollsController.show)

  app.get('/count', pollsController.count);
  
  app.post('/join', {
    onRequest: [authenticate]
  }, pollsController.join);
}

export default pollsRoutes;