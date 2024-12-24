import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.get<{ Querystring: { email: string } }>(
    "/api/users",
    userController.getUserByEmail,
  );

  app.post("/api/users", userController.createUser);
}
