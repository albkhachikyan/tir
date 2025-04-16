import { GraphQLContext } from "../types/context";
import {
  AddTeacherArgs,
  UpdateTeacherArgs,
  IdArgs,
  AddPupilArgs,
  UpdatePupilArgs,
  AddSubjectArgs,
  UpdateSubjectArgs,
  AssignSubjectToPupilArgs,
} from "../types/args";

export const resolvers = {
  Query: {
    teachers: async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
      return ctx.prisma.teacher.findMany({ include: { subjects: true } });
    },
    pupils: async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
      return ctx.prisma.pupil.findMany({
        include: {
          subjects: {
            include: {
              subject: true,
            },
          },
        },
      });
    },
    subjects: async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
      return ctx.prisma.subject.findMany({
        include: {
          teacher: true,
          pupils: {
            include: {
              pupil: true,
            },
          },
        },
      });
    },
  },

  Mutation: {
    addTeacher: async (
      _parent: unknown,
      args: AddTeacherArgs,
      ctx: GraphQLContext
    ) => {
      return ctx.prisma.teacher.create({ data: { name: args.name } });
    },
    updateTeacher: async (
      _parent: unknown,
      args: UpdateTeacherArgs,
      ctx: GraphQLContext
    ) => {
      return ctx.prisma.teacher.update({
        where: { id: args.id },
        data: { name: args.name },
      });
    },
    deleteTeacher: async (
      _parent: unknown,
      args: IdArgs,
      ctx: GraphQLContext
    ) => {
      await ctx.prisma.teacher.delete({ where: { id: args.id } });
      return true;
    },

    addPupil: async (
      _parent: unknown,
      args: AddPupilArgs,
      ctx: GraphQLContext
    ) => {
      return ctx.prisma.pupil.create({
        data: { name: args.name, grade: args.grade },
      });
    },
    updatePupil: async (
      _parent: unknown,
      args: UpdatePupilArgs,
      ctx: GraphQLContext
    ) => {
      return ctx.prisma.pupil.update({
        where: { id: args.id },
        data: { name: args.name, grade: args.grade },
      });
    },
    deletePupil: async (
      _parent: unknown,
      args: IdArgs,
      ctx: GraphQLContext
    ) => {
      await ctx.prisma.pupil.delete({ where: { id: args.id } });
      return true;
    },

    addSubject: async (
      _parent: unknown,
      args: AddSubjectArgs,
      ctx: GraphQLContext
    ) => {
      return ctx.prisma.subject.create({
        data: { name: args.name, grade: args.grade, teacherId: args.teacherId },
      });
    },
    updateSubject: async (
      _parent: unknown,
      args: UpdateSubjectArgs,
      ctx: GraphQLContext
    ) => {
      const { id, ...updateData } = args;
      return ctx.prisma.subject.update({ where: { id }, data: updateData });
    },
    deleteSubject: async (
      _parent: unknown,
      args: IdArgs,
      ctx: GraphQLContext
    ) => {
      await ctx.prisma.subject.delete({ where: { id: args.id } });
      return true;
    },

    assignSubjectToPupil: async (
      _parent: unknown,
      args: AssignSubjectToPupilArgs,
      ctx: GraphQLContext
    ) => {
      await ctx.prisma.pupilSubject.create({
        data: { pupilId: args.pupilId, subjectId: args.subjectId },
      });
      return true;
    },
  },

  Teacher: {
    subjects: (parent: { id: number }, _args: unknown, ctx: GraphQLContext) =>
      ctx.prisma.subject.findMany({ where: { teacherId: parent.id } }),
  },

  Pupil: {
    subjects: async (
      parent: { id: number },
      _args: unknown,
      ctx: GraphQLContext
    ) => {
      const pupilSubjects = await ctx.prisma.pupilSubject.findMany({
        where: { pupilId: parent.id },
        include: { subject: true },
      });
      return pupilSubjects.map((ps) => ps.subject);
    },
  },

  Subject: {
    teacher: (
      parent: { teacherId: number },
      _args: unknown,
      ctx: GraphQLContext
    ) => ctx.prisma.teacher.findUnique({ where: { id: parent.teacherId } }),

    pupils: async (
      parent: { id: number },
      _args: unknown,
      ctx: GraphQLContext
    ) => {
      const pupilSubjects = await ctx.prisma.pupilSubject.findMany({
        where: { subjectId: parent.id },
        include: { pupil: true },
      });
      return pupilSubjects.map((p) => p.pupil);
    },
  },
};
