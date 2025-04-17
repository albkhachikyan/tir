export const pupils = (_, { name }, { prisma }) =>
  prisma.pupil.findMany({
    where: {
      name: name ? { contains: name } : undefined,
    },
    include: { subjects: true, teachers: true },
  });

export const pupil = (_, { id }, { prisma }) =>
  prisma.pupil.findUnique({
    where: { id },
    include: { subjects: true, teachers: true },
  });
