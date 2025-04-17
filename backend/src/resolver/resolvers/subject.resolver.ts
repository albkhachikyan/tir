import { withRole } from "../../utils/auth";

export const subjects = (_, { name }, { prisma }) =>
  prisma.subject.findMany({
    where: {
      name: name ? { contains: name } : undefined,
    },
  });

export const subject = (_, { id }, { prisma }) =>
  prisma.subject.findUnique({
    where: { id },
    include: { pupils: true, teachers: true },
  });

export const createSubject = withRole(
  ["ADMIN"],
  (_, { name, grade }, { prisma }) =>
    prisma.subject.create({ data: { name, grade } })
);

export const deleteSubject = withRole(["ADMIN"], (_, { id }, { prisma }) =>
  prisma.subject.delete({ where: { id: Number(id) } }).then(() => true)
);
