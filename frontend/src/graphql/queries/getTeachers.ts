export const GET_TEACHERS_QUERY = `
  query {
    teachers {
      id
      name
      subjects {
        id
        name
        grade
      }
    }
  }
`;
