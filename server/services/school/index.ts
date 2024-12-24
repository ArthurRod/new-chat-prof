import Fastify from "fastify";
import { schoolRoutes } from "./routes/schoolRoutes";

const app = Fastify();

app.register(schoolRoutes);

app
  .listen({
    port: 3336,
    host: "0.0.0.0",
  })
  .then(() => console.log("School Service running"));
