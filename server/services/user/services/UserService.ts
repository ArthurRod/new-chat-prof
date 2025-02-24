import {prisma} from "../../../libs/prisma";
import {CreateUserBody} from "../interfaces/UserInterfaces";

export class UserService {
  createUser = async (data: CreateUserBody) => {
    const user = await prisma.user.create({data});

    return user;
  };
}
