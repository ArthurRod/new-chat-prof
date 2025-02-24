import {prisma} from "../../../libs/prisma";
import {CreateSchoolsTeachersBody} from "../interfaces/SchoolsTeachersInterfaces";

export class SchoolsTeachersService {
  getSchoolsTeachersBySchoolId = async (schoolId: string, userId: number) => {
    const schoolsTeachers = await prisma.schoolsTeachers.findMany({
      where: {
        schoolUuid: schoolId,
        school: {
          userId,
        },
      },
      select: {
        uuid: true,
        isApproved: true,
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });

    return schoolsTeachers;
  };

  createSchoolsTeachers = async (data: CreateSchoolsTeachersBody) => {
    const schoolsTeachers = await prisma.schoolsTeachers.create({
      data: {
        schoolUuid: data.schoolId,
        teacherUuid: data.teacherId,
      },
    });

    return schoolsTeachers;
  };

  updateSchoolsTeachers = async (
    id: string,
    userId: number,
    isApproved: boolean
  ) => {
    const schoolsTeachers = await prisma.schoolsTeachers.update({
      where: {
        uuid: id,
        school: {
          userId,
        },
      },
      data: {
        isApproved,
      },
      select: {
        uuid: true,
        isApproved: true,
        schoolUuid: true,
        teacherUuid: true,
      },
    });

    return schoolsTeachers;
  };
}
