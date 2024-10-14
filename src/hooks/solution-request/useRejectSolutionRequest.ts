import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectSolutionRequestApi } from "../../services";

export const useRejectSolutionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (solutionId: string) => rejectSolutionRequestApi(solutionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-solution-request"],
      });
    },
  });
};
