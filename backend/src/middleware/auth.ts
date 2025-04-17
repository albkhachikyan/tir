import { Request } from "express";
import { verifyToken } from "../utils/auth";

export const authenticate = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("Authorization header missing");

  const token = authHeader.replace("Bearer ", "");
  try {
    const decodedToken = verifyToken(token);

    return decodedToken;
  } catch {
    throw new Error("Invalid or expired token");
  }
};
