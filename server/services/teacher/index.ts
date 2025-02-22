import {app} from "../../libs/fastify";
import {teacherRoutes} from "./routes/teacherRoutes";

app.register(teacherRoutes);

app
  .listen({
    port: 3337,
    host: "0.0.0.0",
  })
  .then(() => console.log("Teacher Service running"));
