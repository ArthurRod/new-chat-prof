import {FastifyInstance} from "fastify";
import {UserController} from "../controllers/UserController";
import {CreateUserFullBody} from "../interfaces/UserInterfaces";

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();

  /* Create User */
  app.post<{Body: CreateUserFullBody}>("/api/users", userController.createUser);
}
