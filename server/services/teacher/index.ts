import Fastify from "fastify";
import { teacherRoutes } from "./routes/teacherRoutes";

const app = Fastify();

app.register(teacherRoutes);

app
  .listen({
    port: 3337,
    host: "0.0.0.0",
  })
  .then(() => console.log("Teacher Service running"));
