import { PrismaClient, Admin } from "@prisma/client";
import { authenticate } from "./middleware/auth";

const prisma = new PrismaClient();

export interface Context {
  admin: Admin | null;
  prisma: PrismaClient;
}

export const createContext = async ({ req }): Promise<Context> => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let admin = null;

  if (token) {
    try {
      admin = authenticate(req);
      return { admin, prisma };
    } catch (err) {
      console.warn("Invalid token");
    }
  }

  return { admin, prisma };
};
