import { FastifyRequest, FastifyReply } from "fastify";
import { handleError } from "../../../utils/handle-error";
import { SchoolsTeachersService } from "../services/SchoolsTeachersService";
import {
  CreateSchoolsTeachersInput,
  CreateSchoolsTeachersSchema,
  SchoolsTeachersInput,
} from "../schemas/SchoolsTeachersSchema";

export class SchoolsTeachersController {
  private schoolsTeachersService: SchoolsTeachersService;

  constructor() {
    this.schoolsTeachersService = new SchoolsTeachersService();
  }

  getSchoolsTeachersBySchoolId = async (
    request: FastifyRequest<{ Params: { schoolId: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const { schoolId } = request.params;
      const schoolsTeachers =
        await this.schoolsTeachersService.getSchoolsTeachersBySchoolId(
          parseInt(schoolId),
        );

      if (!schoolsTeachers || schoolsTeachers.length === 0)
        return response.status(404).send({
          code: 404,
          status: "Not Found",
          message: "Não foram encontrados professores cadastrados nesta escola",
        });

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: schoolsTeachers,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };

  getSchoolsTeachersByTeacherId = async (
    request: FastifyRequest<{ Params: { teacherId: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const { teacherId } = request.params;
      const schoolsTeachers =
        await this.schoolsTeachersService.getSchoolsTeachersByTeacherId(
          parseInt(teacherId),
        );

      if (!schoolsTeachers || schoolsTeachers.length === 0)
        return response.status(404).send({
          code: 404,
          status: "Not Found",
          message: "Não foram encontrados escolas cadastradas",
        });

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: schoolsTeachers,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };

  createSchoolsTeachers = async (
    request: FastifyRequest<{ Body: CreateSchoolsTeachersInput }>,
    response: FastifyReply,
  ) => {
    try {
      const parsedSchoolsTeachersBody = CreateSchoolsTeachersSchema.parse(
        request.body,
      );

      console.log(parsedSchoolsTeachersBody.schoolId);

      const schoolsTeachersData = {
        schoolId: parsedSchoolsTeachersBody.schoolId,
        teacherId: parsedSchoolsTeachersBody.teacherId,
      };
      const newSchoolsTeachers =
        await this.schoolsTeachersService.createSchoolsTeachers(
          schoolsTeachersData,
        );

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: newSchoolsTeachers,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };

  updateSchoolsTeachers = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const { id } = request.params;
      const schoolsTeachers =
        await this.schoolsTeachersService.updateSchoolsTeachers(parseInt(id));

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: schoolsTeachers,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };
}
