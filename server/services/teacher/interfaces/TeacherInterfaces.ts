import {z} from "zod";
import {
  CreateTeacherFullBodySchema,
  CreateTeacherSchema,
} from "../schemas/TeacherSchema";

export interface GetTeacherByTeacherIdParams {
  teacherId: string;
}

export type CreateTeacherType = z.infer<typeof CreateTeacherSchema>;
export interface CreateTeacherBody extends CreateTeacherType {}

export type CreateTeacherFullBodyType = z.infer<
  typeof CreateTeacherFullBodySchema
>;
export interface CreateTeacherFullBody extends CreateTeacherFullBodyType {}
