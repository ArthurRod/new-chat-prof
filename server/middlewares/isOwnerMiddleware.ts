import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../utils/auth-utils";

export function isOwnerMiddleware() {
  return async (
    request: FastifyRequest<{ Params: { userId: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const decoded = await verifyToken(request);
      const decodedUserId = parseInt(decoded.userId);
      const { userId } = request.params;

      const isEqualUser = parseInt(userId) === decodedUserId;

      if (!isEqualUser)
        return response.status(403).send({
          code: 403,
          status: "Forbidden",
          message: "Acesso negado para este Usuário",
        });

      return;
    } catch (error) {
      return response.status(403).send(error);
    }
  };
}
