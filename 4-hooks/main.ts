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
  fastify.addHook("onRequest", async () => {
    fastify.log.info("Got a request");
  });

  fastify.addHook("onResponse", async (request, reply: FastifyReply) => {
    fastify.log.info(`Responding: ${reply.getResponseTime()}`);
  });

  fastify.get("/", {
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

      const jwt = fastify.signJwt();

      const verified = fastify.verifyJwt();

      return reply.code(201).send({ jwt, verified });
    },
  });

  fastify.log.info("User routes registered");
}

fastify.get("/err", () => {
  return { message: "hello" };
});

async function dbConnector(fastify: FastifyInstance, options) {
  fastify.register(fastifyMongo, {
    url: "mongodb://localhost:27017/fastify",
  });

  fastify.log.info("Connected to database", options);
}

declare module "fastify" {
  export interface FastifyRequest {
    user: {
      name: string;
    };
  }
  export interface FastifyInstance {
    signJwt: () => string;
    verifyJwt: () => {
      name: string;
    };
  }
}

fastify.decorateRequest("user", null);

fastify.addHook(
  "preHandler",
  async (request: FastifyRequest, reply: FastifyReply) => {
    request.user = {
      name: "Bob Jones",
    };
  }
);

fastify.decorate("signJwt", () => {
  return "Signed JWT";
});

fastify.decorate("verifyJwt", () => {
  return {
    name: "Tom",
  };
});

fastify.register(dbConnector);

fastify.register(userRoutes);

async function main() {
  await fastify.listen({
    port: 3000,
    host: "0.0.0.0",
  });
}

[("SIGINT", "SIGTERM")].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();

    process.exit(0);
  });
});

main();
