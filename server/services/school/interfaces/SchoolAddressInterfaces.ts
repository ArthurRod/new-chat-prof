import {z} from "zod";
import {CreateSchoolAddressSchema} from "../schemas/SchoolAddressSchema";

type CreateSchoolAddressType = z.infer<typeof CreateSchoolAddressSchema>;
export interface CreateSchoolAddressBody extends CreateSchoolAddressType {}
