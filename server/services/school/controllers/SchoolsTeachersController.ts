import {FastifyReply, FastifyRequest} from "fastify";
import {verifyToken} from "../../../utils/auth-utils";
import {handleError} from "../../../utils/handle-error";
import {
  CreateSchoolsTeachersBody,
  GetSchoolsTeachersBySchoolIdParams,
  UpdateSchoolsTeachersParams,
} from "../interfaces/SchoolsTeachersInterfaces";
import {
  CreateSchoolsTeachersSchema,
  UpdateSchoolsTeachersSchema,
} from "../schemas/SchoolsTeachersSchema";
import {SchoolsTeachersService} from "../services/SchoolsTeachersService";

export class SchoolsTeachersController {
  private schoolsTeachersService: SchoolsTeachersService;

  constructor() {
    this.schoolsTeachersService = new SchoolsTeachersService();
  }

  getSchoolsTeachersBySchoolId = async (
    request: FastifyRequest<{Params: GetSchoolsTeachersBySchoolIdParams}>,
    response: FastifyReply
  ) => {
    try {
      const {schoolId} = request.params;
      const convertedSchoolId = parseInt(schoolId);
      const decoded = await verifyToken(request);
      const decodedUserId = parseInt(decoded.userId);

      const schoolsTeachers =
        await this.schoolsTeachersService.getSchoolsTeachersBySchoolId(
          convertedSchoolId,
          decodedUserId
        );

      if (!schoolsTeachers) throw new Error("NOT_FOUND");

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
    request: FastifyRequest<{Body: CreateSchoolsTeachersBody}>,
    response: FastifyReply
  ) => {
    try {
      const parsedSchoolsTeachersBody = CreateSchoolsTeachersSchema.parse(
        request.body
      );
      const schoolsTeachersData = {
        schoolId: parsedSchoolsTeachersBody.schoolId,
        teacherId: parsedSchoolsTeachersBody.teacherId,
      };
      const newSchoolsTeachers =
        await this.schoolsTeachersService.createSchoolsTeachers(
          schoolsTeachersData
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
    request: FastifyRequest<{Params: UpdateSchoolsTeachersParams}>,
    response: FastifyReply
  ) => {
    try {
      const {id} = request.params;
      const convertedId = parseInt(id);
      const decoded = await verifyToken(request);
      const decodedUserId = parseInt(decoded.userId);

      const parsedSchoolsTeachersBody = UpdateSchoolsTeachersSchema.parse(
        request.body
      );

      const schoolsTeachers =
        await this.schoolsTeachersService.updateSchoolsTeachers(
          decodedUserId,
          convertedId,
          parsedSchoolsTeachersBody.isApproved
        );

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
