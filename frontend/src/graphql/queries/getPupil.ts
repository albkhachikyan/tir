export const GET_PUPIL_QUERY = `
  query {
    pupils {
      id
      name
      grade
      subjects {
        id
        name
        grade
      }
    }
  }
`;
