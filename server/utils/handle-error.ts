import {PrismaError} from "../types/PrismaError";
import {CustomZodError} from "../types/CustomZodError";
import {handleZodError} from "./get-zod-error";
import {handleAxiosError} from "./get-axios-error";
import {handleGenericError} from "./get-generic-error";
import {handlePrismaError} from "./get-prisma-error";
import {Error} from "../types/Error";

export const handleError = (
  error: any
): CustomZodError | PrismaError | Error => {
  const zodErrorResponse = handleZodError(error);
  const axiosErrorResponse = handleAxiosError(error);
  const genericErrorResponse = handleGenericError(error);
  const prismaErrorResponse = handlePrismaError(error);

  if (zodErrorResponse) return zodErrorResponse;

  if (axiosErrorResponse) return axiosErrorResponse;

  if (genericErrorResponse) return genericErrorResponse;

  return prismaErrorResponse;
};
