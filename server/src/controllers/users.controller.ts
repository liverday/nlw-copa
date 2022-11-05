import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma';

type CreateUserResponse = {
  token: string
}

export default class UsersController {
  private OAUTH_URL: string = 'https://www.googleapis.com/oauth2/v2/userinfo';

  constructor(private fastify: FastifyInstance) {
    this.store = this.store.bind(this);
    
  }

  async count(): Promise<{ count: number }> {
    const count = await prisma.user.count();

    return {
      count
    }
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<CreateUserResponse> {
    const createUserBody = z.object({
      access_token: z.string()
    })

    const { access_token } = createUserBody.parse(request.body);

    const userData = await fetch(this.OAUTH_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => response.json())

    if (userData.error) {
      return reply.status(401).send()
    }

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url()
    })

    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture
        }
      })
    }

    const token = this.fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl
    }, {
      sub: user.id,
      expiresIn: process.env.EXPIRES_IN
    })

    return {
      token
    }
  }
}