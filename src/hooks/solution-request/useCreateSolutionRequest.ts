import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSolutionRequestApi } from "../../services";
import { TCreateSolution } from "../../type/TCreateSolution";

export const useCreateSolutionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createSolutionInfo: TCreateSolution) =>
      createSolutionRequestApi(createSolutionInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-solution-request"],
      });
    },
  });
};
