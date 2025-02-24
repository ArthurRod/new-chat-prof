import axios from "axios";
import {prisma} from "../../../libs/prisma";
import {CreateTeacherBody} from "../interfaces/TeacherInterfaces";
import {CreateUserBody} from "../interfaces/UserInterfaces";

export class TeacherService {
  getTeacherByTeacherId = async (teacherId: string, userId: number) => {
    const teacher = await prisma.teacher.findUnique({
      where: {uuid: teacherId, userId},
      select: {
        uuid: true,
        name: true,
      },
    });

    return teacher;
  };

  createTeacher = async (data: CreateTeacherBody) => {
    const teacher = await prisma.teacher.create({data});

    return teacher;
  };

  createTeacherUser = async (data: CreateUserBody) => {
    const userData = await axios.post("http://localhost:3333/api/users", data);

    const user = userData.data.data;

    return user;
  };
}
