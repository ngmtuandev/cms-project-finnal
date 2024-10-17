import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSolutionApi } from "../../services";

export const useUpdateSolution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateInfo: any) => updateSolutionApi(updateInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-solution-condition"],
      });
    },
  });
};
