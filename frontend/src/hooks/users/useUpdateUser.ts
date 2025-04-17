import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axiosInstance";
import { UPDATE_USER_MUTATION } from "../../graphql/mutations/user";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: {
      id: string;
      name?: string;
      email?: string;
    }) => {
      const response = await axios.post("", {
        query: UPDATE_USER_MUTATION,
        variables,
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data.updateUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
