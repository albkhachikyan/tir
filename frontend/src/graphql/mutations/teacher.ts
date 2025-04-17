export const ASSIGN_SUBJECT_TO_TEACHER_MUTATION = `
  mutation AssignSubjectToTeacher($teacherId: ID!, $subjectId: ID!) {
    assignSubjectToTeacher(teacherId: $teacherId, subjectId: $subjectId) {
      id
      subjects {
        id
        name
      }
    }
  }
`;
