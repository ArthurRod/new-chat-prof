import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../../../utils/auth-utils";
import { prisma } from "../../../libs/prisma";

export function isOwnerTeacherMiddleware() {
  return async (
    request: FastifyRequest<{ Params: { teacherId: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const decoded = await verifyToken(request);
      const decodedUserId = parseInt(decoded.userId);
      const { teacherId } = request.params;

      const teacher = await prisma.teacher.findUnique({
        where: { userId: decodedUserId, id: parseInt(teacherId) },
      });

      if (!teacher)
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
