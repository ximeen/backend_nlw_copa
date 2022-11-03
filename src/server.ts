import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

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
  await fastify.listen({ port: 3333 });
}
boostrap();
