import { FastifyRequest, FastifyReply } from "fastify";
import {
  CreateTeacherInput,
  CreateTeacherSchema,
} from "../schemas/TeacherSchema";
import { handleError } from "../../../utils/handle-error";
import { TeacherService } from "../services/TeacherService";

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  getTeacherByUserId = async (
    request: FastifyRequest<{ Params: { userId: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const { userId } = request.params;
      const teacher = await this.teacherService.getTeacherByUserId(
        parseInt(userId),
      );

      if (!teacher)
        return response.status(404).send({
          code: 404,
          status: "Not Found",
          message: "Não foram encontrados professores com esse identificador",
        });

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: teacher,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };

  createTeacher = async (
    request: FastifyRequest<{ Body: CreateTeacherInput }>,
    response: FastifyReply,
  ) => {
    try {
      const parsedTeacherBody = CreateTeacherSchema.parse(request.body);

      const userData = {
        email: parsedTeacherBody.email,
        password: parsedTeacherBody.password,
        confirmPassword: parsedTeacherBody.confirmPassword,
        role: parsedTeacherBody.role,
      };
      const newUser = await this.teacherService.createTeacherUser(userData);

      const teacherData = {
        userId: newUser.id,
        name: parsedTeacherBody.name,
        subjects: parsedTeacherBody.subjects,
      };
      const newTeacher = await this.teacherService.createTeacher(teacherData);

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: newTeacher,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };
}
