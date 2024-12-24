import {PrismaError} from "../types/PrismaError";
import {Prisma} from "@prisma/client";

const errorCodeMapping: Record<
  string,
  (error: Prisma.PrismaClientKnownRequestError) => PrismaError
> = {
  P2002: (error: Prisma.PrismaClientKnownRequestError) => {
    const modelName = error.meta?.modelName;
    const target = error.meta?.target;

    return {
      code: 409,
      status: "Conflict",
      message: `Esse ${target} já está associado á um ${modelName}.`,
    };
  },
  P2003: (error: Prisma.PrismaClientKnownRequestError) => {
    const field_name = error.meta!.field_name! as string;

    return {
      code: 400,
      status: "Bad Request",
      message: `O valor apontado em ${field_name} faz referência a um registro inexistente.`,
    };
  },
  default: () => ({
    code: 500,
    status: "Internal Server Error",
    message:
      "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
    errors: {},
  }),
};

export const handlePrismaError = (error: any): PrismaError => {
  const handler = errorCodeMapping[error.code] || errorCodeMapping.default;
  return handler(error);
};
