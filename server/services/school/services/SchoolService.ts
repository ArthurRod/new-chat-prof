import axios from "axios";
import {prisma} from "../../../libs/prisma";
import {CreateSchoolBody} from "../interfaces/SchoolInterfaces";
import {CreateUserFullBody} from "../interfaces/UserInterfaces";

export class SchoolService {
  getSchoolBySchoolId = async (schoolId: string, userId: number) => {
    const school = await prisma.school.findUnique({
      where: {uuid: schoolId, userId},
      select: {
        uuid: true,
        name: true,
        fixedPeriod: true,
        schoolAddress: {
          select: {
            uuid: true,
            zipCode: true,
            country: true,
            state: true,
            city: true,
            neighborhood: true,
            street: true,
            number: true,
            complement: true,
          },
        },
      },
    });

    return school;
  };

  getSchoolBySchoolCode = async (schoolCode: string) => {
    const schools = await prisma.school.findUnique({
      where: {
        schoolCode,
      },
      select: {
        uuid: true,
        schoolCode: true,
        name: true,
      },
    });

    return schools;
  };

  createSchool = async (data: CreateSchoolBody) => {
    const school = await prisma.school.create({data});

    return school;
  };

  createSchoolUser = async (data: CreateUserFullBody) => {
    const userData = await axios.post("http://localhost:3333/api/users", data);

    const user = userData.data.data;

    return user;
  };
}
