import { z } from "zod";

export const CreateTeacherSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Este campo é obrigatório",
    })
    .max(191, {
      message: "Este campo suporta no máximo 191 caracteres",
    }),
});
