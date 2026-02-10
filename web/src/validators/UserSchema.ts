import { Role } from "@/enums/Role";
import { z } from "zod";

export const CreateUserSchema = z
  .object({
    email: z
      .string()
      .min(6, {
        message: "Digite o email no formato correto",
      })
      .max(50, {
        message: "Este campo suporta no máximo 50 caracteres",
      })
      .email({
        message: "Digite o email no formato correto",
      }),
    password: z
      .string()
      .min(6, {
        message: "Digite a senha no formato correto",
      })
      .max(20, {
        message: "Este campo suporta no máximo 20 caracteres",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Digite a senha no formato correto",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Digite a senha no formato correto",
      })
      .max(20, {
        message: "Este campo suporta no máximo 20 caracteres",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Digite a senha no formato correto",
      }),
    role: z.nativeEnum(Role, {
      errorMap: () => {
        return { message: "Selecione um tipo válido de usuário" };
      },
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não estão iguais",
    path: ["confirmPassword"],
  });
