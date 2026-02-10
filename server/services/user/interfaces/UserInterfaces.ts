import {z} from "zod";
import {
  CreateUserFullBodySchema,
  CreateUserSchema,
} from "../validators/UserSchema";

type CreateUserType = z.infer<typeof CreateUserSchema>;
export interface CreateUserBody extends CreateUserType {}

export type CreateUserFullBodyType = z.infer<typeof CreateUserFullBodySchema>;
export interface CreateUserFullBody extends CreateUserFullBodyType {}
