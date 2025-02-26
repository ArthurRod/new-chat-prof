import {z} from "zod";

export const SchoolAddressSchema = z.object({
  zipCode: z
    .string()
    .min(5, {message: "Type a valid zipCode"})
    .max(8, {message: "Type a valid zipCode"})
    .regex(/^\d+$/, {message: "The zip code must contain only numbers"})
    .transform((val) => Number(val)),
  country: z.string().min(1).max(191),
  state: z.string().min(1).max(191),
  city: z.string().min(1).max(191),
  neighborhood: z.string().min(1).max(191),
  street: z.string().min(1).max(191),
  number: z
    .string()
    .min(1)
    .regex(/^\d+$/, {message: "The number must contain only numbers"})
    .transform((val) => Number(val)),
  complement: z.string().max(191),
});

export const CreateSchoolAddressSchema = SchoolAddressSchema.extend({
  schoolId: z.number(),
});
