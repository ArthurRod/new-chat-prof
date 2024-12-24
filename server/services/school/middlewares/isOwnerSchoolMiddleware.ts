import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../../../utils/auth-utils";
import { prisma } from "../../../libs/prisma";

export function isOwnerSchoolMiddleware() {
  return async (
    request: FastifyRequest<{ Params: { schoolId: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const decoded = await verifyToken(request);
      const decodedUserId = parseInt(decoded.userId);
      const { schoolId } = request.params;

      const school = await prisma.school.findUnique({
        where: { userId: decodedUserId, id: parseInt(schoolId) },
      });

      if (!school)
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
