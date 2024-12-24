import { prisma } from "../../../libs/prisma";
import { UserInput } from "../schemas/UserSchema";

export class UserService {
  getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  };

  createUser = async (data: UserInput) => {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });

    return user;
  };
}
