import axios from "axios";
import {prisma} from "../../../libs/prisma";

export class AuthService {
  getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  };
}
