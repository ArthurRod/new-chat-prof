import {z} from "zod";
import {CreateUserFullBodySchema} from "../schemas/UserSchema";

export type CreateUserFullBodyType = z.infer<typeof CreateUserFullBodySchema>;
export interface CreateUserFullBody extends CreateUserFullBodyType {}
