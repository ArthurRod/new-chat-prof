import {FastifyReply, FastifyRequest} from "fastify";
import {verifyToken} from "../../../utils/auth-utils";
import {handleError} from "../../../utils/handle-error";
import {
  CreateTeacherFullBody,
  GetTeacherByTeacherIdParams,
} from "../interfaces/TeacherInterfaces";
import {CreateTeacherFullBodySchema} from "../validators/TeacherSchema";
import {TeacherService} from "../services/TeacherService";

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  getTeacherByTeacherId = async (
    request: FastifyRequest<{Params: GetTeacherByTeacherIdParams}>,
    response: FastifyReply
  ) => {
    try {
      const {teacherId} = request.params;
      const decoded = await verifyToken(request);
      const decodedUserId = parseInt(decoded.userId);

      const teacher = await this.teacherService.getTeacherByTeacherId(
        teacherId,
        decodedUserId
      );

      if (!teacher) throw new Error("NOT_FOUND");

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
    request: FastifyRequest<{Body: CreateTeacherFullBody}>,
    response: FastifyReply
  ) => {
    try {
      const parsedBody = CreateTeacherFullBodySchema.parse(request.body);

      const userData = {
        email: parsedBody.email,
        password: parsedBody.password,
        confirmPassword: parsedBody.confirmPassword,
        role: parsedBody.role,
      };

      const teacherData = {
        name: parsedBody.name,
        subjects: parsedBody.subjects,
      };

      const newUser = await this.teacherService.createTeacherUser(userData);

      const newTeacher = await this.teacherService.createTeacher({
        ...teacherData,
        userId: newUser.id,
      });

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
