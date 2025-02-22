import {app} from "../../libs/fastify";
import {userRoutes} from "./routes/userRoutes";

app.register(userRoutes);

app
  .listen({
    port: 3335,
    host: "0.0.0.0",
  })
  .then(() => console.log("User Service running"));
