import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSolutionApi } from "../../services";
import { TCreateSolution } from "../../type/TCreateSolution";

export const useCreateSolution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createSolutionInfo: TCreateSolution) =>
      createSolutionApi(createSolutionInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-solution"],
      });
    },
  });
};
