import {z} from "zod";

export const CreateSchoolsTeachersSchema = z.object({
  schoolId: z.number(),
  teacherId: z.number(),
});

export const UpdateSchoolsTeachersSchema = z.object({
  isApproved: z.boolean(),
});
