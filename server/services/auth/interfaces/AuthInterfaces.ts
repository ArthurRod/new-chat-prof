import {z} from "zod";
import {LoginUserSchema} from "../validators/AuthSchema";

type LoginUserType = z.infer<typeof LoginUserSchema>;
export interface LoginUserBody extends LoginUserType {}
