import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@doe.com',
      avatarUrl: 'https://github.com/liverday.png'
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Example Poll',
      code: 'BOL123',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.000Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.000Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'US',
      
      guesses: {
        create: {
          firstTeamGoals: 2,
          secondTeamGoals: 1,
          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id
              }
            }
          }
        }
      }
    }
  })
})();