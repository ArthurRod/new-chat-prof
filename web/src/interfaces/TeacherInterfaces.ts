/* eslint-disable @typescript-eslint/no-empty-object-type */
import { z } from "zod";
import { CreateTeacherSchema } from "../schemas/TeacherSchema";

export interface GetTeacherByTeacherIdParams {
  teacherId: string;
}

export type CreateTeacherType = z.infer<typeof CreateTeacherSchema>;
export interface CreateTeacherBody extends CreateTeacherType {}
