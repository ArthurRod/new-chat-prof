import {z} from "zod";
import {CreateUserSchema} from "../schemas/UserSchema";

export type CreateUserType = z.infer<typeof CreateUserSchema>;
export interface CreateUserBody extends CreateUserType {}
