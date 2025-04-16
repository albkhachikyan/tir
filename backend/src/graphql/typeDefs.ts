import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    password: String!
    role: String!
  }

  type Teacher {
    id: Int!
    name: String!
    subjects: [Subject!]!
  }

  type Pupil {
    id: Int!
    name: String!
    grade: Int!
    subjects: [Subject!]!
  }

  type Subject {
    id: Int!
    name: String!
    grade: Int!
    teacher: Teacher!
    pupils: [Pupil!]!
  }

  type Query {
    teachers: [Teacher!]!
    pupils: [Pupil!]!
    subjects: [Subject!]!
  }

  type Mutation {
    addTeacher(name: String!): Teacher!
    updateTeacher(id: Int!, name: String!): Teacher!
    deleteTeacher(id: Int!): Boolean!

    addPupil(name: String!, grade: Int!): Pupil!
    updatePupil(id: Int!, name: String!, grade: Int!): Pupil!
    deletePupil(id: Int!): Boolean!

    addSubject(name: String!, grade: Int!, teacherId: Int!): Subject!
    updateSubject(id: Int!, name: String, grade: Int, teacherId: Int): Subject!
    deleteSubject(id: Int!): Boolean!

    assignSubjectToPupil(pupilId: Int!, subjectId: Int!): Boolean!
  }
`;
