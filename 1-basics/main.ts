import Fastify, { FastifyReply, FastifyRequest } from "fastify";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

fastify.post("/api/users", {
  handler: async (
    request: FastifyRequest<{
      Body: {
        name: string;
        age: number;
      };
    }>,
    reply: FastifyReply
  ) => {
    const body = request.body;

    console.log({ body });

    return reply.code(201).send(body);
  },
});

async function main() {
  await fastify.listen({
    port: 3000,
    host: "0.0.0.0",
  });
}

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();

    process.exit(0);
  });
});

main();
