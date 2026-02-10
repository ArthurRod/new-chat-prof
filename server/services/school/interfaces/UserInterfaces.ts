import {z} from "zod";
import {CreateUserFullBodySchema} from "../validators/UserSchema";

export type CreateUserFullBodyType = z.infer<typeof CreateUserFullBodySchema>;
export interface CreateUserFullBody extends CreateUserFullBodyType {}
