import { withRole } from "../../utils/auth";

export const teachers = withRole(
  ["ADMIN", "TEACHER"],
  (_, { name }, { prisma }) =>
    prisma.teacher.findMany({
      where: {
        name: name ? { contains: name } : undefined,
      },
      include: { subjects: true, pupils: true },
    })
);

export const teacher = withRole(["ADMIN"], (_, { id }, { prisma }) =>
  prisma.teacher.findUnique({
    where: { id },
    include: { subjects: true, pupils: true },
  })
);
