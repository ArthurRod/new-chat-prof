import {z} from "zod";
import {CreateSchoolAddressSchema} from "../validators/SchoolAddressSchema";

type CreateSchoolAddressType = z.infer<typeof CreateSchoolAddressSchema>;
export interface CreateSchoolAddressBody extends CreateSchoolAddressType {}
