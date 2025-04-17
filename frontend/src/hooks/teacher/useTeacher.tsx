import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import { GET_TEACHERS_QUERY } from "../../graphql/queries/getTeachers";

export type Teacher = {
  id: string;
  name: string;
  subjects?: {
    id: string;
    name: string;
    grade: number;
  }[];
};

export const fetchTeachers = async (): Promise<Teacher[]> => {
  const response = await axiosInstance.post("", {
    query: GET_TEACHERS_QUERY,
  });

  return response.data.data.teachers;
};

export const useTeachers = () => {
  return useQuery<Teacher[]>({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });
};
