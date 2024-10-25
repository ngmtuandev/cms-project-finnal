import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProblemApi } from "../../services";
import { TCreateProblem } from "../../type/TCreateProblem";
export const useCreateProblem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createProblemInfo: TCreateProblem) =>
      createProblemApi(createProblemInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-problem"],
      });
    },
  });
};
