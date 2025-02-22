import {z} from "zod";
import {
  CreateSchoolsTeachersSchema,
  UpdateSchoolsTeachersSchema,
} from "../schemas/SchoolsTeachersSchema";

export interface GetSchoolsTeachersBySchoolIdParams {
  schoolId: string;
}

export interface UpdateSchoolsTeachersParams {
  schoolId: string;
  id: string;
}

type CreateSchoolsTeachersType = z.infer<typeof CreateSchoolsTeachersSchema>;
export interface CreateSchoolsTeachersBody extends CreateSchoolsTeachersType {}

type UpdateSchoolsTeachersType = z.infer<typeof UpdateSchoolsTeachersSchema>;
export interface UpdateSchoolsTeachersBody extends UpdateSchoolsTeachersType {}
