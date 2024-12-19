import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusLabApi } from "../../services/lab/updateStatusLabApi";

export const useUpdateStatusLab = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: any) => updateStatusLabApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["labs"],
      });
    },
  });
};
