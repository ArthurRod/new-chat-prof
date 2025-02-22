import axios from "axios";
import {prisma} from "../../../libs/prisma";
import {CreateSchoolBody} from "../interfaces/SchoolInterfaces";
import {CreateUserBody} from "../interfaces/UserInterfaces";

export class SchoolService {
  getSchoolBySchoolId = async (schoolId: number, userId: number) => {
    const school = await prisma.school.findUnique({
      where: {id: schoolId, userId},
      select: {
        id: true,
        userId: true,
        name: true,
        fixedPeriod: true,
        schoolAddress: true,
      },
    });

    return school;
  };

  getSchoolByNameStreetId = async (nameStreetId: string) => {
    const schools = await prisma.school.findMany({
      where: {
        nameStreetId: {
          contains: nameStreetId,
        },
      },
      select: {
        userId: true,
        nameStreetId: true,
      },
    });

    return schools;
  };

  createSchool = async (data: CreateSchoolBody) => {
    const school = await prisma.school.create({data});

    return school;
  };

  createSchoolUser = async (data: CreateUserBody) => {
    const userData = await axios.post("http://localhost:3333/api/users", data);

    const user = userData.data.data;

    return user;
  };
}
