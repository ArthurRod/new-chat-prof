import {fastifyCookie} from "@fastify/cookie";
import bcrypt from "bcrypt";
import {FastifyReply, FastifyRequest} from "fastify";
import {generateToken} from "../../../utils/auth-utils";
import {handleError} from "../../../utils/handle-error";
import {LoginUserBody} from "../interfaces/AuthInterfaces";
import {LoginUserSchema} from "../schemas/AuthSchema";
import {AuthService} from "../services/AuthService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  loginUser = async (
    request: FastifyRequest<{Body: LoginUserBody}>,
    response: FastifyReply
  ) => {
    try {
      const parsedBody = LoginUserSchema.parse(request.body);

      const user = await this.authService.getUserByEmail(parsedBody.email);

      if (!user) throw new Error("NOT_FOUND_USER");

      const passwordMatch = await bcrypt.compare(
        parsedBody.password,
        user.password
      );

      if (!passwordMatch) throw new Error("UNAUTHORIZED");

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
