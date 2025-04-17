import CreateUserDto from "../../dto/CreateUserDto";
import { withRole } from "../../utils/auth";

export const me = async (_, __, { user, prisma }) => {
  return await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      teacher: true,
      pupil: true,
    },
  });
};

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

export const updateUser = withRole(
  ["ADMIN"],
  async (_, { id, name, email }, { prisma }) => {
    const existing = await prisma.user.findUnique({
      where: { id: +id },
    });

    if (!existing) {
      throw new Error(`User with ID ${id} not found.`);
    }

    const updated = await prisma.user.update({
      where: { id: +id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
      },
    });

    return updated;
  }
);
