import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/auth";

const prisma = new PrismaClient();

async function main() {
  const hashed = await hashPassword(process.env.ADMIN_USER_PASSWORD);

  await prisma.user.create({
    data: {
      name: process.env.ADMIN_USER_NAME,
      email: process.env.ADMIN_USER_EMAIL,
      password: hashed,
      role: "ADMIN",
    },
  });
}

main();
