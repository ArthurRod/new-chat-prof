import cors from "@fastify/cors";
import proxy from "@fastify/http-proxy";
import {app} from "../../libs/fastify";

app.register(cors, {
  origin: "http://localhost:3000",
  credentials: true,
});

app.addHook("onRequest", async (request, reply) => {
  console.log("Received request:", request.raw.method, request.raw.url);
});

app.register(proxy, {
  upstream: "http://localhost:3334",
  prefix: "/api/auth",
  rewritePrefix: "/api/auth",
});
app.register(proxy, {
  upstream: "http://localhost:3335",
  prefix: "/api/users",
  rewritePrefix: "/api/users",
});
app.register(proxy, {
  upstream: "http://localhost:3336",
  prefix: "/api/schools",
  rewritePrefix: "/api/schools",
});
app.register(proxy, {
  upstream: "http://localhost:3337",
  prefix: "/api/teachers",
  rewritePrefix: "/api/teachers",
});

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => console.log("HTTP Server running"));
