import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResultApi } from "../../services";

export const useDeleteResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idResult: string) => deleteResultApi(idResult),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-result"],
      });
    },
  });
};
