import Fastify from "fastify";
import {authRoutes} from "./routes/authRoutes";

const app = Fastify();

app.register(authRoutes);

app
  .listen({
    port: 3334,
    host: "0.0.0.0",
  })
  .then(() => console.log("Auth Service running"));
