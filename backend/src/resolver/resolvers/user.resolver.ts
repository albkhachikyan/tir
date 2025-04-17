import CreateUserDto from "../../dto/createUserDto";
import { withRole } from "../../utils/auth";

export const users = (_, __, { prisma }) => {
  return prisma.user.findMany({ include: { teacher: true, pupil: true } });
};

export const createUser = async (_, args, { prisma }) => {
  const user = await new CreateUserDto(args).createUser();

  return await prisma.user.create(user);
};

export const deleteUser = withRole(["ADMIN"], async (_, { id }, { prisma }) => {
  await prisma.user.delete({ where: { id: Number(id) } });
  return true;
});
