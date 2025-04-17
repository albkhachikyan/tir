import { PrismaClient, User } from "@prisma/client";
import { authenticate } from "./middleware/auth";

const prisma = new PrismaClient();

export interface Context {
  user: User | null;
  prisma: PrismaClient;
}

export const createContext = async ({ req }): Promise<Context> => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let user = null;

  if (token) {
    try {
      user = authenticate(req);
      return { user, prisma };
    } catch (err) {
      console.warn("Invalid token");
    }
  }

  return { user, prisma };
};
