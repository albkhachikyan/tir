import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import { GET_SUBJECT_QUERY } from "../../graphql/queries/getSubject";

export type Subject = {
  id: string;
  name: string;
  grade: number;
};

export const fetchSubject = async (): Promise<Subject[]> => {
  const response = await axiosInstance.post("", {
    query: GET_SUBJECT_QUERY,
  });

  return response.data.data.subjects;
};

export const useSubject = () => {
  return useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: fetchSubject,
  });
};
