import {FastifyReply, FastifyRequest} from "fastify";
import {verifyToken} from "../../../utils/auth-utils";
import {handleError} from "../../../utils/handle-error";
import {
  CreateSchoolFullBody,
  GetSchoolBySchoolCodeQuery,
  GetSchoolBySchoolIdParams,
} from "../interfaces/SchoolInterfaces";
import {CreateSchoolFullBodySchema} from "../schemas/SchoolSchema";
import {SchoolAddressService} from "../services/SchoolAddressService";
import {SchoolService} from "../services/SchoolService";

export class SchoolController {
  private schoolService: SchoolService;
  private schoolAddressService: SchoolAddressService;

  constructor() {
    this.schoolService = new SchoolService();
    this.schoolAddressService = new SchoolAddressService();
  }

  getSchoolBySchoolId = async (
    request: FastifyRequest<{Params: GetSchoolBySchoolIdParams}>,
    response: FastifyReply
  ) => {
    try {
      const {schoolId} = request.params;
      const decoded = await verifyToken(request);
      const decodedUserId = parseInt(decoded.userId);

      const school = await this.schoolService.getSchoolBySchoolId(
        schoolId,
        decodedUserId
      );

      if (!school) throw new Error("NOT_FOUND");

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: school,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };

  getSchoolBySchoolCode = async (
    request: FastifyRequest<{Querystring: GetSchoolBySchoolCodeQuery}>,
    response: FastifyReply
  ) => {
    try {
      const {schoolCode} = request.query;

      const school = await this.schoolService.getSchoolBySchoolCode(schoolCode);

      if (!school) throw new Error("NOT_FOUND");

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: school,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };

  createSchool = async (
    request: FastifyRequest<{Body: CreateSchoolFullBody}>,
    response: FastifyReply
  ) => {
    try {
      const parsedBody = CreateSchoolFullBodySchema.parse(request.body);

      const userData = {
        email: parsedBody.email,
        password: parsedBody.password,
        confirmPassword: parsedBody.confirmPassword,
        role: parsedBody.role,
      };

      const schoolData = {
        name: parsedBody.name,
        fixedPeriod: parsedBody.fixedPeriod,
      };

      const schoolAddressData = {
        zipCode: parsedBody.zipCode,
        country: parsedBody.country,
        state: parsedBody.state,
        city: parsedBody.city,
        neighborhood: parsedBody.neighborhood,
        street: parsedBody.street,
        number: parsedBody.number,
        complement: parsedBody.complement,
      };

      const newUser = await this.schoolService.createSchoolUser(userData);

      const newSchool = await this.schoolService.createSchool({
        ...schoolData,
        userId: newUser.id,
      });

      const schoolAddress = await this.schoolAddressService.createSchoolAddress(
        {
          schoolId: newSchool.id,
          ...schoolAddressData,
        }
      );

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: newSchool,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };
}
