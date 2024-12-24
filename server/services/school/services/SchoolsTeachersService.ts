import { prisma } from "../../../libs/prisma";
import { SchoolsTeachersInput } from "../schemas/SchoolsTeachersSchema";

export class SchoolsTeachersService {
  getSchoolsTeachersBySchoolId = async (schoolId: number) => {
    const schoolsTeachers = await prisma.schoolsTeachers.findMany({
      where: {
        schoolId: {
          equals: schoolId,
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

  getSchoolsTeachersByTeacherId = async (teacherId: number) => {
    const schoolsTeachers = await prisma.schoolsTeachers.findMany({
      where: {
        teacherId: {
          equals: teacherId,
        },
      },
      select: {
        id: true,
        isApproved: true,
        school: true,
      },
    });

    return schoolsTeachers;
  };

  createSchoolsTeachers = async (data: SchoolsTeachersInput) => {
    const schoolsTeachers = await prisma.schoolsTeachers.create({
      data: {
        schoolId: data.schoolId,
        teacherId: data.teacherId,
      },
    });

    return schoolsTeachers;
  };

  updateSchoolsTeachers = async (id: number) => {
    const schoolsTeachers = await prisma.schoolsTeachers.update({
      where: {
        id: id,
      },
      data: {
        isApproved: true,
      },
    });

    return schoolsTeachers;
  };
}
