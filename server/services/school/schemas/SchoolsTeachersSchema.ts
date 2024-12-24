import { z } from "zod";

export const SchoolsTeachersSchema = z.object({
  schoolId: z.number(),
  teacherId: z.number(),
});

export const CreateSchoolsTeachersSchema = z.object({
  schoolId: z.number(),
  teacherId: z.number(),
});

export type SchoolsTeachersInput = z.infer<typeof SchoolsTeachersSchema>;
export type CreateSchoolsTeachersInput = z.infer<
  typeof CreateSchoolsTeachersSchema
>;
