import { FastifyInstance } from "fastify";
import AuthController from "../controllers/auth.controller";
import { authenticate } from "../plugins/authenticate";

const authRoutes = async (app: FastifyInstance) => {
  const authController = new AuthController();
  app.get('/me', {
    onRequest: [authenticate]
  }, authController.show);
}

export default authRoutes;