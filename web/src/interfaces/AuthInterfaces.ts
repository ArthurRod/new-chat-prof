/* eslint-disable @typescript-eslint/no-empty-object-type */
import { z } from "zod";
import { LoginUserSchema } from "../schemas/AuthSchema";

type LoginUserType = z.infer<typeof LoginUserSchema>;
export interface LoginUserBody extends LoginUserType {}
