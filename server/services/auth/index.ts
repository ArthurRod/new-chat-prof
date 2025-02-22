import {app} from "../../libs/fastify";
import fastifyCookie, {FastifyCookieOptions} from "@fastify/cookie";
import {authRoutes} from "./routes/authRoutes";

app.register(fastifyCookie, {
  secret: process.env.JWT_SECRET,
  hook: "onRequest",
  parseOptions: {httpOnly: true},
} as FastifyCookieOptions);

app.register(authRoutes);

app
  .listen({
    port: 3334,
    host: "0.0.0.0",
  })
  .then(() => console.log("Auth Service running"));
