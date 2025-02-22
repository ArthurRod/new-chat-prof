import {app} from "../../libs/fastify";
import {schoolRoutes} from "./routes/schoolRoutes";

app.register(schoolRoutes);

app
  .listen({
    port: 3336,
    host: "0.0.0.0",
  })
  .then(() => console.log("School Service running"));
