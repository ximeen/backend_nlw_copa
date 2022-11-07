import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function Main() {
  const user = prisma.user.create({
    data: {
      name: "Jonh doe",
      email: "jonhdoe@gmaila.com",
      avatarUrl: "https://github.com/ximeen.png",
    },
  });
     const pool = prisma.pool.create({
        data: {
            title: "exempe title",
            code: "BOL123",
            ownerId: (await user).id,

          Participant:{
            create:{
                userId: (await user).id
            }
          }
        } 
     })

    //  const participant = prisma.participant.create({
    //     data: {
    //         poolId: (await pool).id,
    //         userId: (await user).id
    //     }
    //  })

     await prisma.game.create({
        data:{
            date: "2022-11-05T23:13:41.730Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR"

        }
     })

     await prisma.game.create({
        data: {
            date: "2022-11-06T23:13:41.730Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses: {
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId:{
                                userId: (await user).id,
                                poolId: (await pool).id
                            }
                        }
                    } 
                }
            }
        }
     })
}

Main()