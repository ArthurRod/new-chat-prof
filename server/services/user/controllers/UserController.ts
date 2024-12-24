import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import { handleError } from "../../../utils/handle-error";
import { CreateUserSchema, CreateUserInput } from "../schemas/UserSchema";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUserByEmail = async (
    request: FastifyRequest<{ Querystring: { email: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const { email } = request.query;
      const user = await this.userService.getUserByEmail(email);

      if (!user)
        return response.status(404).send({
          code: 404,
          status: "Not Found",
          message: `Não existe um Usuário associado ao email: ${email}.`,
        });

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: user,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };

  createUser = async (
    request: FastifyRequest<{ Body: CreateUserInput }>,
    response: FastifyReply,
  ) => {
    try {
      const parsedBody = CreateUserSchema.parse(request.body);

      const hashedPassword = await bcrypt.hash(parsedBody.password, 10);
      const userData = {
        email: parsedBody.email,
        password: hashedPassword,
        role: parsedBody.role,
      };
      const newUser = await this.userService.createUser(userData);

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: newUser,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };
}
