import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSolutionApi } from "../../services";

export const useDeleteSolution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idSolution: string) => deleteSolutionApi(idSolution),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-solution"],
      });
    },
  });
};
