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

export const updateSubject = withRole(
  ["ADMIN"],
  async (_, { id, name, grade }, { prisma }) => {
    try {
      const existing = await prisma.subject.findUnique({
        where: { id: +id },
      });

      if (!existing) {
        throw new Error(`Subject with ID ${id} not found.`);
      }

      const updated = await prisma.subject.update({
        where: { id: +id },
        data: {
          ...(name !== undefined && { name }),
          ...(grade !== undefined && { grade }),
        },
      });

      return updated;
    } catch (error) {
      console.error("UpdateSubject Error:", error);
      throw new Error(error.message || "Failed to update subject.");
    }
  }
);
