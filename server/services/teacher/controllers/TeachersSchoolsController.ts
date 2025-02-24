import {FastifyReply, FastifyRequest} from "fastify";
import {verifyToken} from "../../../utils/auth-utils";
import {handleError} from "../../../utils/handle-error";
import {GetTeachersSchoolsByTeacherIdParams} from "../interfaces/TeachersSchoolsInterfaces";
import {TeachersSchoolsService} from "../services/TeachersSchoolsService";

export class TeachersSchoolsController {
  private teachersSchoolsService: TeachersSchoolsService;

  constructor() {
    this.teachersSchoolsService = new TeachersSchoolsService();
  }

  getTeachersSchoolsByTeacherId = async (
    request: FastifyRequest<{Params: GetTeachersSchoolsByTeacherIdParams}>,
    response: FastifyReply
  ) => {
    try {
      const {teacherId} = request.params;
      const decoded = await verifyToken(request);
      const decodedUserId = parseInt(decoded.userId);

      const schoolsTeachers =
        await this.teachersSchoolsService.getTeachersSchoolsByTeacherId(
          teacherId,
          decodedUserId
        );

      if (!schoolsTeachers || schoolsTeachers.length === 0)
        throw new Error("NOT_FOUND");

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
