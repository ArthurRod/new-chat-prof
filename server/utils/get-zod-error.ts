import { ZodError } from "zod";
import { CustomZodError } from "../types/CustomZodError";

const errorHandlers: Record<string, (error: ZodError) => CustomZodError> = {
  ZodError: (error: ZodError) => ({
    code: 400,
    status: "Bad Request",
    message: "Alguns campos estão em formato inválido ou estão faltando",
    errors: error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    })),
  }),
};

export const handleZodError = (error: any): CustomZodError | undefined => {
  if (error.name != "ZodError") return;

  const handler = errorHandlers["ZodError"];
  return handler(error);
};
