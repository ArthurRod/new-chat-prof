import {z} from "zod";
import {
  CreateSchoolFullBodySchema,
  CreateSchoolSchema,
} from "../schemas/SchoolSchema";

export interface GetSchoolBySchoolCodeQuery {
  schoolCode: string;
}

export interface GetSchoolBySchoolIdParams {
  schoolId: string;
}

type CreateSchoolType = z.infer<typeof CreateSchoolSchema>;
export interface CreateSchoolBody extends CreateSchoolType {}

type CreateSchoolFullBodyType = z.infer<typeof CreateSchoolFullBodySchema>;
export interface CreateSchoolFullBody extends CreateSchoolFullBodyType {}
