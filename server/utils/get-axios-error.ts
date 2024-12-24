import {Error} from "../types/Error";

export const handleAxiosError = (error: any): Error | undefined => {
  const errorData = error?.response?.data;

  if (!errorData) return;

  const axiosError = {
    code: errorData.code,
    status: errorData.status,
    message: errorData.message,
  };

  return axiosError;
};
