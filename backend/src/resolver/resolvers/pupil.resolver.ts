import { withRole } from "../../utils/auth";

export const pupils = withRole(
  ["ADMIN", "TEACHER"],
  (_, { name }, { prisma }) =>
    prisma.pupil.findMany({
      where: {
        name: name ? { contains: name } : undefined,
      },
      include: { subjects: true, teachers: true },
    })
);

export const pupil = withRole(["ADMIN", "TEACHER"], (_, { id }, { prisma }) =>
  prisma.pupil.findUnique({
    where: { id },
    include: { subjects: true, teachers: true },
  })
);
