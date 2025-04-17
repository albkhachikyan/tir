import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axiosInstance";
import { ASSIGN_SUBJECT_TO_TEACHER_MUTATION } from "../../graphql/mutations/teacher";

type AssignSubjectVariables = {
  teacherId: string;
  subjectId: string;
};

export const useAssignSubjectToTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: AssignSubjectVariables) => {
      const response = await axios.post("", {
        query: ASSIGN_SUBJECT_TO_TEACHER_MUTATION,
        variables,
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data.assignSubjectToTeacher;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teacher", variables.teacherId],
      });
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};
