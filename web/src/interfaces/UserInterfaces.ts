/* eslint-disable @typescript-eslint/no-empty-object-type */
import { z } from "zod";
import { CreateUserSchema } from "../schemas/UserSchema";

type CreateUserType = z.infer<typeof CreateUserSchema>;
export interface CreateUserBody extends CreateUserType {}
