import axios from "axios";

export class AuthService {
  getAuthUserByEmail = async (email: string): Promise<any> => {
    const userData = await axios.get("http://localhost:3333/api/users", {
      params: {
        email: email,
      },
    });

    const user = userData.data.data;

    return user;
  };
}
