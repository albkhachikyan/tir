import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axiosInstance";
import { CREATE_USER_MUTATION } from "../../graphql/mutations/user";

type CreateUserVariables = {
  name: string;
  email: string;
  password?: string;
  role: "ADMIN" | "TEACHER" | "PUPIL" | "";
  grade?: number;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: CreateUserVariables) => {
      const response = await axios.post("", {
        query: CREATE_USER_MUTATION,
        variables,
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data.createUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refresh user list
    },
  });
};
