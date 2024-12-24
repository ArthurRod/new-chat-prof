import Fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";

const app = Fastify();

app.register(userRoutes);

app
  .listen({
    port: 3335,
    host: "0.0.0.0",
  })
  .then(() => console.log("User Service running"));
