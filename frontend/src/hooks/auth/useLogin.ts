import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axiosInstance";
import { LOGIN_QUERY } from "../../graphql/mutations/login";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axios.post("", {
        query: LOGIN_QUERY,
        variables: { email, password },
      });

      const token = res.data.data.login.token;
      localStorage.setItem("authToken", token);
      queryClient.setQueryData(["user"], res.data.data.login.user);

      return res.data.data.login.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
