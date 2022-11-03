import { FastifyInstance, FastifyServerOptions } from "fastify";
import UsersController from "../controllers/users.controller";

const usersRoutes = (app: FastifyInstance, opts: FastifyServerOptions, done: Function) => {
  const usersController = new UsersController();
  app.get('/count', usersController.count);

  done();
}

export default usersRoutes;