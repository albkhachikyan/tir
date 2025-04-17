export const UPDATE_USER_MUTATION = `
  mutation UpdateUser($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
      role
    }
  }
`;

export const DELETE_USER_MUTATION = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const CREATE_USER_MUTATION = `
  mutation($name: String!, $email: String!, $password: String!, $role: Role!) {
    createUser(name: $name, email: $email, password: $password, role: $role, grade: 15) {
      id
      name
      email
      role
    }
  }
`;
