import { withRole } from "../../utils/auth";

export const assignSubjectToTeacher = withRole(
  ["ADMIN"],
  (_, { teacherId, subjectId }, { prisma }) =>
    prisma.teacher.update({
      where: { id: Number(teacherId) },
      data: { subjects: { connect: { id: Number(subjectId) } } },
      include: { subjects: true },
    })
);

export const assignPupilToTeacher = withRole(
  ["ADMIN"],
  (_, { pupilId, teacherId }, { prisma }) =>
    prisma.pupil.update({
      where: { id: +pupilId },
      data: { teachers: { connect: { id: Number(teacherId) } } },
      include: { teachers: true },
    })
);

export const assignSubjectToPupil = withRole(
  ["ADMIN", "TEACHER"],
  async (_, { pupilId, subjectId }, { prisma }) => {
    const pupil = await prisma.pupil.findUnique({
      where: { id: Number(pupilId) },
    });
    const subject = await prisma.subject.findUnique({
      where: { id: Number(subjectId) },
    });

    if (!pupil || !subject) {
      throw new Error("Pupil or subject not found");
    }

    if (pupil.grade !== subject.grade)
      throw new Error("Subject grade does not match pupil's grade");

    return prisma.pupil.update({
      where: { id: Number(pupilId) },
      data: { subjects: { connect: { id: Number(subjectId) } } },
      include: { subjects: true },
    });
  }
);
