export const GET_USERS_QUERY = `
  query {
      users {
        id
        email
        name
        role
        teacher {
          id
          name
        }
        pupil {
          id
          name
          grade
        }
      }
    }
`;
