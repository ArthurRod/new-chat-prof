import {ZodTreatedError} from "./ZodTreatedError";

export type CustomZodError = {
  code: number;
  status: string;
  message: string;
  errors: ZodTreatedError[];
};
