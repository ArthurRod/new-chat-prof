import {Role} from "@prisma/client";
import {z} from "zod";

export const CreateUserSchema = z.object({
  email: z.string().min(6).max(50).email({
    message: "Invalid email format.",
  }),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Invalid password format.",
    }),
  confirmPassword: z
    .string()
    .min(6)
    .max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Invalid password format.",
    }),
  role: z.nativeEnum(Role, {
    errorMap: () => {
      return {message: "Select a valid user type."};
    },
  }),
});
