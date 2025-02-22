import {FastifyReply, FastifyRequest} from "fastify";
import {verifyToken} from "../utils/auth-utils";

export function isAuthMiddleware() {
  return async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const decoded = await verifyToken(request);

      return decoded;
    } catch (error) {
      return response.status(403).send(error);
    }
  };
}
