import {FastifyInstance} from "fastify";
import {AuthController} from "../controllers/AuthController";

export async function authRoutes(app: FastifyInstance) {
  const authController = new AuthController();

  app.post("/api/auth", authController.loginUser);
}
