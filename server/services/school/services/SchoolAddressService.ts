import { prisma } from "../../../libs/prisma";
import { SchoolAddressInput } from "../schemas/SchoolAddressSchema";

export class SchoolAddressService {
  createSchoolAddress = async (data: SchoolAddressInput) => {
    const schoolAddress = await prisma.schoolAddress.create({ data });

    return schoolAddress;
  };
}
