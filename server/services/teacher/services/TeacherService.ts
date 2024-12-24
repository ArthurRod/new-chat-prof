import axios from "axios";
import { prisma } from "../../../libs/prisma";
import { TeacherInput } from "../schemas/TeacherSchema";
import { CreateUserInput } from "../schemas/UserSchema";

export class TeacherService {
  getTeacherByUserId = async (userId: number) => {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: userId },
      select: {
        id: true,
        userId: true,
        name: true,
      },
    });

    return teacher;
  };

  createTeacher = async (data: TeacherInput) => {
    const teacher = await prisma.teacher.create({
      data: {
        userId: data.userId,
        name: data.name,
        subjects: data.subjects,
      },
    });

    return teacher;
  };

  createTeacherUser = async (data: CreateUserInput) => {
    const teacherData = await axios.post("http://localhost:3333/api/users", {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: data.role,
    });

    const user = teacherData.data.data;

    return user;
  };
}
