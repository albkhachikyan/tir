import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum Role {
    ADMIN
    TEACHER
    PUPIL
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: Role!
    teacher: Teacher
    pupil: Pupil
  }

  type Teacher {
    id: ID!
    name: String!
    subjects: [Subject!]!
    pupils: [Pupil!]!
  }

  type Pupil {
    id: ID!
    name: String!
    grade: Int!
    subjects: [Subject!]!
    teachers: [Teacher!]!
  }

  type Subject {
    id: ID!
    name: String!
    grade: Int!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User!
    users: [User!]!

    teachers(name: String): [Teacher!]!
    teacher(id: Int!): Teacher

    pupils(name: String): [Pupil!]!
    pupil(id: Int!): Pupil

    subjects(name: String): [Subject!]!
    subject(id: Int!): Subject
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!

    createUser(
      name: String!
      email: String!
      password: String!
      role: Role!
      grade: Int
    ): User!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): Boolean!

    createSubject(name: String!, grade: Int!): Subject!
    updateSubject(id: ID!, name: String, grade: Int): Subject!
    deleteSubject(id: ID!): Boolean!

    assignSubjectToTeacher(teacherId: ID!, subjectId: ID!): Teacher!
    assignPupilToTeacher(pupilId: ID!, teacherId: ID!): Pupil!
    assignSubjectToPupil(pupilId: ID!, subjectId: ID!): Pupil!
  }
`;
