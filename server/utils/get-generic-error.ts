import {Error} from "../types/Error";

const errorCodeMapping: Record<string, (error: string) => Error> = {
  NOT_FOUND: () => ({
    code: 404,
    status: "Not Found",
    message: "Unable to find records",
  }),
  NOT_FOUND_USER: () => ({
    code: 404,
    status: "Not Found",
    message: "User not found",
  }),
  UNAUTHORIZED: () => ({
    code: 401,
    status: "Unauthorized",
    message: "Incorrect password",
  }),
  default: () => ({
    code: 500,
    status: "Internal Server Error",
    message: "Error performing the action",
  }),
};

export const handleGenericError = (error: any): Error | undefined => {
  if (error.name != "Error") return;

  const handler = errorCodeMapping[error.message] || errorCodeMapping.default;
  return handler(error);
};
