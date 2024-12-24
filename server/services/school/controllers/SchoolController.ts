import { FastifyRequest, FastifyReply } from "fastify";
import { CreateSchoolInput, CreateSchoolSchema } from "../schemas/SchoolSchema";
import { handleError } from "../../../utils/handle-error";
import { SchoolService } from "../services/SchoolService";
import { SchoolAddressService } from "../services/SchoolAddressService";
import { CreateSchoolAddressSchema } from "../schemas/SchoolAddressSchema";

export class SchoolController {
  private schoolService: SchoolService;
  private schoolAddressService: SchoolAddressService;

  constructor() {
    this.schoolService = new SchoolService();
    this.schoolAddressService = new SchoolAddressService();
  }

  getSchoolByUserId = async (
    request: FastifyRequest<{ Params: { userId: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const { userId } = request.params;
      const school = await this.schoolService.getSchoolByUserId(
        parseInt(userId),
      );

      if (!school)
        return response.status(404).send({
          code: 404,
          status: "Not Found",
          message: "Não foram encontradas escolas com esse identificador",
        });

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

  getSchoolByNameStreetId = async (
    request: FastifyRequest<{ Querystring: { nameStreetId: string } }>,
    response: FastifyReply,
  ) => {
    try {
      const { nameStreetId } = request.query;
      const schools =
        await this.schoolService.getSchoolByNameStreetId(nameStreetId);

      if (!schools || schools.length === 0)
        return response.status(404).send({
          code: 404,
          status: "Not Found",
          message: `Não encontrado.`,
        });

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: schools,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };

  createSchool = async (
    request: FastifyRequest<{ Body: CreateSchoolInput }>,
    response: FastifyReply,
  ) => {
    try {
      const parsedSchoolBody = CreateSchoolSchema.parse(request.body);
      const parsedSchoolAddressBody = CreateSchoolAddressSchema.parse(
        request.body,
      );

      const userData = {
        email: parsedSchoolBody.email,
        password: parsedSchoolBody.password,
        confirmPassword: parsedSchoolBody.confirmPassword,
        role: parsedSchoolBody.role,
      };
      const newUser = await this.schoolService.createSchoolUser(userData);

      const schoolData = {
        userId: newUser.id,
        nameStreetId: `${newUser.id} - ${parsedSchoolBody.name} - ${parsedSchoolBody.street}`,
        name: parsedSchoolBody.name,
        fixedPeriod: parsedSchoolBody.fixedPeriod,
      };
      const newSchool = await this.schoolService.createSchool(schoolData);

      const schoolAddressData = {
        schoolId: newSchool.id,
        ...parsedSchoolAddressBody,
      };
      const newSchoolAddress =
        await this.schoolAddressService.createSchoolAddress(schoolAddressData);

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
