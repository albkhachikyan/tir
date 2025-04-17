import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import { GET_USERS_QUERY } from "../../graphql/queries/getUsers";

export type User = {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "TEACHER" | "PUPIL";
  teacher?: {
    id: string;
    name: string;
  };
  pupil?: {
    id: string;
    name: string;
    grade: string;
  };
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.post("", {
    query: GET_USERS_QUERY,
  });

  return response.data.data.users;
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
