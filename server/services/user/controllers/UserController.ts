import bcrypt from "bcrypt";
import {FastifyReply, FastifyRequest} from "fastify";
import {handleError} from "../../../utils/handle-error";
import {CreateUserFullBody} from "../interfaces/UserInterfaces";
import {CreateUserSchema} from "../validators/UserSchema";
import {UserService} from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (
    request: FastifyRequest<{Body: CreateUserFullBody}>,
    response: FastifyReply
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
