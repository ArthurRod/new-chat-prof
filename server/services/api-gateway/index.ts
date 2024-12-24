import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify();

app.register(cors);

app.addHook("onRequest", async (request, reply) => {
  console.log("Received request:", request.raw.method, request.raw.url);
});

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => console.log("HTTP Server running"));
