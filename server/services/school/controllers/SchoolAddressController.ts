import { FastifyRequest, FastifyReply } from "fastify";
import { SchoolAddressService } from "../services/SchoolAddressService";
import {
  SchoolAddressInput,
  SchoolAddressSchema,
} from "../schemas/SchoolAddressSchema";
import { handleError } from "../../../utils/handle-error";

export class SchoolAddressController {
  private schoolAddressService: SchoolAddressService;

  constructor() {
    this.schoolAddressService = new SchoolAddressService();
  }

  createSchoolAddress = async (
    request: FastifyRequest<{ Body: SchoolAddressInput }>,
    response: FastifyReply,
  ) => {
    try {
      const parsedBody = SchoolAddressSchema.parse(request.body);
      const newSchoolAddress =
        await this.schoolAddressService.createSchoolAddress(parsedBody);

      return response.code(200).send({
        code: 200,
        status: "OK",
        message: "Successfully",
        data: newSchoolAddress,
      });
    } catch (error) {
      const errorResponse = handleError(error);

      return response.code(errorResponse.code).send(errorResponse);
    }
  };
}
