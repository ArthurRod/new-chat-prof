import { z } from "zod";

export const CreateSchoolAddressSchema = z.object({
  zipCode: z
    .string()
    .min(5, { message: "Digite um CEP válido" })
    .max(8, { message: "Digite um CEP válido" })
    .regex(/^\d{5}-?\d{3}$/, {
      message: "O CEP deve estar no formato 12345-678 ou 12345678",
    }),
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
    .regex(/^\d+[a-zA-Z]?$/, {
      message:
        "O número deve conter apenas números e, opcionalmente, uma letra no final",
    }),
  complement: z.string().max(191, {
    message: "Este campo é obrigatório",
  }),
});
