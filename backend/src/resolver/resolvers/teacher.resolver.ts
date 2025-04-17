export const teachers = (_, { name }, { prisma }) =>
  prisma.teacher.findMany({
    where: {
      name: name ? { contains: name } : undefined,
    },
    include: { subjects: true, pupils: true },
  });

export const teacher = (_, { id }, { prisma }) =>
  prisma.teacher.findUnique({
    where: { id },
    include: { subjects: true, pupils: true },
  });
