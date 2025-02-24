import {FastifyInstance} from "fastify";
import {AuthController} from "../controllers/AuthController";
import {LoginUserBody} from "../interfaces/AuthInterfaces";

export async function authRoutes(app: FastifyInstance) {
  const authController = new AuthController();

  /* Login User */
  app.post<{Body: LoginUserBody}>("/api/auth", authController.loginUser);
}
