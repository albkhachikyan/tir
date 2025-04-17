import { useQuery } from "@tanstack/react-query";
import axios from "../../lib/axiosInstance";
import { GET_ME_QUERY } from "../../graphql/queries/getMe";

export const getMe = async () => {
  const response = await axios.post("", {
    query: GET_ME_QUERY,
  });

  return response.data.data.me;
};

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
