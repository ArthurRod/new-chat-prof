import { z } from "zod";

export const SchoolAddressSchema = z.object({
  schoolId: z.number(),
  zipCode: z.number().min(10000).max(99999999),
  country: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  neighborhood: z.string().min(1).max(100),
  street: z.string().min(1).max(100),
  number: z.number().min(1).max(999999),
  complement: z.string().max(100),
});

export const CreateSchoolAddressSchema = z.object({
  zipCode: z.number().min(10000).max(99999999),
  country: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  neighborhood: z.string().min(1).max(100),
  street: z.string().min(1).max(100),
  number: z.number().min(1).max(999999),
  complement: z.string().max(100),
});

export type SchoolAddressInput = z.infer<typeof SchoolAddressSchema>;
export type CreateSchoolAddressInput = z.infer<
  typeof CreateSchoolAddressSchema
>;
