import {prisma} from "../../../libs/prisma";
import {CreateSchoolsTeachersBody} from "../interfaces/SchoolsTeachersInterfaces";

export class SchoolsTeachersService {
  getSchoolsTeachersBySchoolId = async (schoolId: number, userId: number) => {
    const schoolsTeachers = await prisma.schoolsTeachers.findMany({
      where: {
        schoolId,
        school: {
          userId,
        },
      },
      select: {
        id: true,
        isApproved: true,
        teacher: true,
      },
    });

    return schoolsTeachers;
  };

  createSchoolsTeachers = async (data: CreateSchoolsTeachersBody) => {
    const schoolsTeachers = await prisma.schoolsTeachers.create({
      data: {
        schoolId: data.schoolId,
        teacherId: data.teacherId,
      },
    });

    return schoolsTeachers;
  };

  updateSchoolsTeachers = async (
    id: number,
    userId: number,
    isApproved: boolean
  ) => {
    const schoolsTeachers = await prisma.schoolsTeachers.update({
      where: {
        id: id,
        school: {
          userId,
        },
      },
      data: {
        isApproved,
      },
    });

    return schoolsTeachers;
  };
}
