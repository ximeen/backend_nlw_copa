import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";

const Prisma = new PrismaClient({
  log: ["query"],
});

async function boostrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const count = await Prisma.pool.count();
    return { count };
  });

  fastify.post("/pools", async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(request.body);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await Prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return reply.status(201).send({ code });
  });

  fastify.get("/users/count", async () => {
    const users = await Prisma.user.count();
    return { users };
  })

  fastify.get("/guesses/count", async () => {
    const guesses = await Prisma.guess.count();
    return { guesses };
  })

  await fastify.listen({ port: 3333 });
}
boostrap();
