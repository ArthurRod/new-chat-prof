import { z } from "zod";

export const CreateSchoolAddressSchema = z.object({
  zipCode: z
    .string()
    .min(5, { message: "Digite um CEP válido" })
    .max(8, { message: "Digite um CEP válido" })
    .regex(/^\d+$/, { message: "O CEP deve conter apenas números" })
    .transform((val) => Number(val)),
  country: z
    .string()
    .min(1, {
      message: "Este campo é obrigatório",
    })
    .max(191, {
      message: "Este campo suporta no máximo 191 caracteres",
    }),
  state: z
    .string()
    .min(1, {
      message: "Este campo é obrigatório",
    })
    .max(191, {
      message: "Este campo suporta no máximo 191 caracteres",
    }),
  city: z
    .string()
    .min(1, {
      message: "Este campo é obrigatório",
    })
    .max(191, {
      message: "Este campo suporta no máximo 191 caracteres",
    }),
  neighborhood: z
    .string()
    .min(1, {
      message: "Este campo é obrigatório",
    })
    .max(191, {
      message: "Este campo suporta no máximo 191 caracteres",
    }),
  street: z
    .string()
    .min(1, {
      message: "Este campo é obrigatório",
    })
    .max(191, {
      message: "Este campo suporta no máximo 191 caracteres",
    }),
  number: z
    .string()
    .min(1, { message: "Este campo é obrigatório" })
    .regex(/^\d+$/, { message: "O número deve conter apenas números" })
    .transform((val) => Number(val)),
  complement: z.string().max(191, {
    message: "Este campo é obrigatório",
  }),
});
