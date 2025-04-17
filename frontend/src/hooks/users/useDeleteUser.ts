import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axiosInstance";
import { DELETE_USER_MUTATION } from "../../graphql/mutations/user";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: { id: string }) => {
      const response = await axios.post("", {
        query: DELETE_USER_MUTATION,
        variables,
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data.deleteUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
