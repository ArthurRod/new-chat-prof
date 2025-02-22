import {prisma} from "../../../libs/prisma";
import {CreateSchoolAddressBody} from "../interfaces/SchoolAddressInterfaces";

export class SchoolAddressService {
  createSchoolAddress = async (data: CreateSchoolAddressBody) => {
    const schoolAddress = await prisma.schoolAddress.create({data});

    return schoolAddress;
  };
}
