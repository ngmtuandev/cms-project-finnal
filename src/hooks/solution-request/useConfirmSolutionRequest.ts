import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmSolutionRequestApi } from "../../services";

export const useConfirmSolutionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (solutionId: string) => confirmSolutionRequestApi(solutionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-solution-condition"],
      });
    },
  });
};
