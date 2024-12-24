import {jwtVerify, SignJWT} from "jose";
import {DecodedUser} from "../types/DecodedUser";
import {FastifyRequest, RouteGenericInterface} from "fastify";

const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);

export async function generateToken(user: any) {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({alg: "HS256"})
    .setExpirationTime("24h")
    .sign(secret);

  return token;
}

export async function verifyToken<T extends RouteGenericInterface>(
  request: FastifyRequest<T>
) {
  try {
    const authHeader = request.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) throw new Error("Token não fornecido");

    const {payload} = await jwtVerify(token, secret);

    const decoded = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp,
    } as DecodedUser;

    return decoded;
  } catch (error: any) {
    throw new Error(error.message || "Token inválido");
  }
}
