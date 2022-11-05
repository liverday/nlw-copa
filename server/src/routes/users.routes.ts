import { FastifyInstance } from "fastify";
import UsersController from "../controllers/users.controller";

const usersRoutes = async (app: FastifyInstance) => {
  const usersController = new UsersController(app);
  app.get('/count', usersController.count);
  app.post('/', usersController.store);
}

export default usersRoutes;