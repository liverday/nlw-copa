import { FastifyInstance } from "fastify";
import UsersController from "../controllers/users.controller";

const usersRoutes = async (app: FastifyInstance) => {
  const usersController = new UsersController();
  app.get('/count', usersController.count);
}

export default usersRoutes;