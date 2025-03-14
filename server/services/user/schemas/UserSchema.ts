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
  role: z.nativeEnum(Role, {
    errorMap: () => {
      return {message: "Select a valid user type."};
    },
  }),
});

export const CreateUserFullBodySchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não estão iguais",
    path: ["customConfirmError"],
  });
