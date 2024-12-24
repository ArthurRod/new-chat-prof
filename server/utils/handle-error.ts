import axios from "axios";
import { PrismaError } from "../types/PrismaError";
import { CustomZodError } from "../types/CustomZodError";
import { handlePrismaError } from "./get-prisma-error";
import { handleZodError } from "./get-zod-error";
import { handleAxiosError } from "./get-axios-error";
import { Error } from "../types/Error";

export const handleError = (
  error: any
): CustomZodError | PrismaError | Error => {
  const zodErrorResponse = handleZodError(error);
  const axiosErrorResponse = handleAxiosError(error);
  const prismaErrorResponse = handlePrismaError(error);

  if (zodErrorResponse) return zodErrorResponse;

  if (axiosErrorResponse) return axiosErrorResponse;

  return prismaErrorResponse;
};
