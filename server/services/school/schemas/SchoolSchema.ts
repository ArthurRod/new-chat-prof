import {FixedPeriod, Role} from "@prisma/client";
import {z} from "zod";

export const CreateSchoolSchema = z.object({
  userId: z.number(),
  nameStreetId: z.string().min(1).max(191),
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
  zipCode: z.number().min(10000).max(99999999),
  country: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  neighborhood: z.string().min(1).max(100),
  street: z.string().min(1).max(100),
  number: z.number().min(1).max(999999),
  complement: z.string().max(100),
  name: z.string().min(1).max(191),
  fixedPeriod: z.nativeEnum(FixedPeriod, {
    errorMap: () => {
      return {message: "Select a valid period."};
    },
  }),
});
