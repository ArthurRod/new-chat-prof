import {Error} from "../types/Error";

const errorCodeMapping: Record<string, (error: string) => Error> = {
  NOT_FOUND: () => ({
    code: 404,
    status: "Not Found",
    message: "Não foi possível encontrar os registros",
  }),
  default: () => ({
    code: 500,
    status: "Internal Server Error",
    message: "Erro ao realizar a ação",
  }),
};

export const handleGenericError = (error: any): Error | undefined => {
  if (error.name != "Error") return;

  const handler = errorCodeMapping[error.message] || errorCodeMapping.default;
  return handler(error);
};
