import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyMongo from "@fastify/mongodb";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/", {
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

  fastify.log.info("User routes registered");
}

async function dbConnector(fastify: FastifyInstance, options) {
  fastify.register(fastifyMongo, {
    url: "mongodb://localhost:27017/fastify",
  });

  fastify.log.info("Connected to database", options);
}

fastify.register(dbConnector);

fastify.register(userRoutes, { prefix: "/api/users" });

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
