import {jwtVerify, SignJWT} from "jose";
import dotenv from "dotenv";
import {FastifyRequest, RouteGenericInterface} from "fastify";
import {DecodedUser} from "../types/DecodedUser";
import {User} from "@prisma/client";
import {handleTokenError} from "./get-token-error";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);

export async function generateToken(user: User) {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({alg: "HS256"})
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(secret);

  return token;
}

export async function verifyToken<T extends RouteGenericInterface>(
  request: FastifyRequest<T>
) {
  try {
    const authHeader = request.headers["cookie"];

    if (!authHeader) throw new Error("Header não fornecido");

    const token = getHeaderCookieToken(authHeader);
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
    const tokenError = handleTokenError(error);

    throw new Error(tokenError);
  }
}

function getHeaderCookieToken(authHeader: string) {
  const cookies = authHeader
    .split("; ")
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value || "");

      return acc;
    }, {});

  const token = cookies["accessToken"];

  if (!token) throw new Error("Token não fornecido");

  return token;
}
