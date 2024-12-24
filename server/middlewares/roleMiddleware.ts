import { FastifyReply, FastifyRequest } from "fastify";

import { Role } from "@prisma/client";
import { verifyToken } from "../utils/auth-utils";

export function roleMiddleware(role: Role) {
  return async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const decoded = await verifyToken(request);

      if (decoded.role !== role)
        return response.status(403).send({
          code: 403,
          status: "Forbidden",
          message: "Acesso negado para este tipo de Usuário",
        });

      return;
    } catch (error) {
      return response.status(403).send(error);
    }
  };
}
