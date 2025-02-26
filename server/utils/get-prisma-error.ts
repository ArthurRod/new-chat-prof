import {PrismaError} from "../types/PrismaError";
import {Prisma} from "@prisma/client";

const errorCodeMapping: Record<
  string,
  (error: Prisma.PrismaClientKnownRequestError) => PrismaError
> = {
  P2002: () => {
    return {
      code: 409,
      status: "Conflict",
      message: "This record already exists.",
    };
  },
  P2003: () => {
    return {
      code: 400,
      status: "Bad Request",
      message: "The value references a non-existent record.",
    };
  },
  default: () => ({
    code: 500,
    status: "Internal Server Error",
    message: "A server error has occurred. Please try again later.",
    errors: {},
  }),
};

export const handlePrismaError = (error: any): PrismaError => {
  const handler = errorCodeMapping[error.code] || errorCodeMapping.default;
  return handler(error);
};
