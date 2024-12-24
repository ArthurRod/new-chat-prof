import axios from "axios";
import { prisma } from "../../../libs/prisma";
import { SchoolInput } from "../schemas/SchoolSchema";
import { CreateUserInput } from "../schemas/UserSchema";

export class SchoolService {
  getSchoolByUserId = async (userId: number) => {
    const school = await prisma.school.findUnique({
      where: { userId: userId },
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
        id: true,
        nameStreetId: true,
      },
    });

    return schools;
  };

  createSchool = async (data: SchoolInput) => {
    const school = await prisma.school.create({
      data: {
        userId: data.userId,
        nameStreetId: data.nameStreetId,
        name: data.name,
        fixedPeriod: data.fixedPeriod,
      },
    });

    return school;
  };

  createSchoolUser = async (data: CreateUserInput) => {
    const userData = await axios.post("http://localhost:3333/api/users", {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: data.role,
    });

    const user = userData.data.data;

    return user;
  };
}
