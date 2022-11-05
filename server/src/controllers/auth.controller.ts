import { FastifyRequest } from "fastify";

export default class AuthController {
  async show(request: FastifyRequest) {
    return { user: request.user }
  }
}