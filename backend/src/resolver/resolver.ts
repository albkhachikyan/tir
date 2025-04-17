import { login } from "../resolver/resolvers/auth.resolver";
import { pupil, pupils } from "../resolver/resolvers/pupil.resolver";
import {
  assignPupilToTeacher,
  assignSubjectToPupil,
  assignSubjectToTeacher,
} from "../resolver/resolvers/relations.resolver";
import {
  createSubject,
  deleteSubject,
  subject,
  subjects,
} from "../resolver/resolvers/subject.resolver";
import { teacher, teachers } from "../resolver/resolvers/teacher.resolver";
import {
  createUser,
  deleteUser,
  users,
} from "../resolver/resolvers/user.resolver";

export const resolvers = {
  Query: {
    users,
    teacher,
    teachers,
    pupil,
    pupils,
    subject,
    subjects,
  },
  Mutation: {
    login,
    createUser,
    deleteUser,
    createSubject,
    deleteSubject,
    assignSubjectToTeacher,
    assignPupilToTeacher,
    assignSubjectToPupil,
  },
};
