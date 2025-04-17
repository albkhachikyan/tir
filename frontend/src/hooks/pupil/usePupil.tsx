import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import { GET_PUPIL_QUERY } from "../../graphql/queries/getPupil";

export type Pupil = {
  id: string;
  name: string;
  grade: number;
  subjects?: {
    id: string;
    name: string;
    grade: number;
  }[];
};

export const fetchPupil = async (): Promise<Pupil[]> => {
  const response = await axiosInstance.post("", {
    query: GET_PUPIL_QUERY,
  });

  return response.data.data.pupils;
};

export const usePupil = () => {
  return useQuery<Pupil[]>({
    queryKey: ["pupils"],
    queryFn: fetchPupil,
  });
};
