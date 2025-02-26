/* eslint-disable @typescript-eslint/no-empty-object-type */
import { z } from "zod";
import { CreateSchoolSchema } from "../schemas/SchoolSchema";

export interface GetSchoolBySchoolCodeQuery {
  schoolCode: string;
}

export interface GetSchoolBySchoolIdParams {
  schoolId: string;
}

type CreateSchoolType = z.infer<typeof CreateSchoolSchema>;
export interface CreateSchoolBody extends CreateSchoolType {}
