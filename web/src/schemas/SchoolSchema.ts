import { FixedPeriod } from "@/enums/FixedPeriod";
import { z } from "zod";

export const CreateSchoolSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Este campo é obrigatório",
    })
    .max(191, {
      message: "Este campo suporta no máximo 191 caracteres",
    }),
  fixedPeriod: z.nativeEnum(FixedPeriod, {
    errorMap: () => {
      return { message: "Select a valid period." };
    },
  }),
});
