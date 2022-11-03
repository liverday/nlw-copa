import { FastifyInstance, FastifyServerOptions } from "fastify";
import PoolsController from "../controllers/pools.controller";

const poolsRoutes = (app: FastifyInstance, opts: FastifyServerOptions, done: Function) => {
  const poolsController = new PoolsController();

  app.post('/', poolsController.store)
  app.get('/', poolsController.index)
  app.get('/count', poolsController.count);

  done();
}

export default poolsRoutes;