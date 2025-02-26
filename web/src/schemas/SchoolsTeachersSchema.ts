import { z } from "zod";

export const CreateSchoolsTeachersSchema = z.object({
  schoolId: z.string(),
  teacherId: z.string(),
});

export const UpdateSchoolsTeachersSchema = z.object({
  isApproved: z.boolean(),
});
