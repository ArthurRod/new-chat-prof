import {FixedPeriod, Role} from "@prisma/client";
import {z} from "zod";

export const CreateSchoolSchema = z.object({
  userId: z.number(),
  name: z.string().min(1).max(191),
  fixedPeriod: z.nativeEnum(FixedPeriod, {
    errorMap: () => {
      return {message: "Select a valid period."};
    },
  }),
});

export const CreateSchoolFullBodySchema = z.object({
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
  name: z.string().min(1).max(191),
  fixedPeriod: z.nativeEnum(FixedPeriod, {
    errorMap: () => {
      return {message: "Select a valid period."};
    },
  }),
});
