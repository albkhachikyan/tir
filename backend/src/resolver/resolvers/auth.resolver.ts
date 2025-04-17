import { comparePasswords, createToken } from "../../utils/auth";

export const login = async (_, { email, password }, { prisma }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePasswords(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const { id, role } = user;

  const token = createToken({
    id,
    role,
    email,
  });

  return { token, user };
};
