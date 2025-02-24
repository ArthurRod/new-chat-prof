import {prisma} from "../../../libs/prisma";

export class TeachersSchoolsService {
  getTeachersSchoolsByTeacherId = async (teacherId: string, userId: number) => {
    const schoolsTeachers = await prisma.schoolsTeachers.findMany({
      where: {
        teacherUuid: teacherId,
        teacher: {
          userId,
        },
      },
      select: {
        uuid: true,
        isApproved: true,
        school: {
          select: {
            name: true,
          },
        },
      },
    });

    return schoolsTeachers;
  };
}
