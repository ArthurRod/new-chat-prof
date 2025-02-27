import {Error} from "../types/Error";

const errorCodeMapping: Record<string, (error: string) => string> = {
  ERR_JWT_EXPIRED: () => "Token has expired",
  default: () => "Invalid token",
};

export const handleTokenError = (error: any): string => {
  const handler = errorCodeMapping[error.code] || errorCodeMapping.default;
  return handler(error);
};
