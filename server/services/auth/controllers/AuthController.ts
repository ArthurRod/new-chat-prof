import {FastifyRequest, FastifyReply} from "fastify";
import {fastifyCookie} from "@fastify/cookie";
import bcrypt from "bcrypt";
import {handleError} from "../../../utils/handle-error";
import {LoginUserSchema, LoginUserInput} from "../schemas/AuthSchema";
import {AuthService} from "../services/AuthService";
import {generateToken} from "../../../utils/auth-utils";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  loginUser = async (
    request: FastifyRequest<{Body: LoginUserInput}>,
    response: FastifyReply
  ) => {
    try {
      const parsedBody = LoginUserSchema.parse(request.body);

      const user = await this.authService.getAuthUserByEmail(parsedBody.email);

      const passwordMatch = await bcrypt.compare(
        parsedBody.password,
        user.password
      );

      if (!passwordMatch)
        return response.status(401).send({
          code: 401,
          status: "Unauthorized",
          message: `Incorrect password.`,
        });

      const token = await generateToken(user);

      const cookie = fastifyCookie.serialize("accessToken", token);

      response.header("Set-Cookie", cookie);

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };
}
