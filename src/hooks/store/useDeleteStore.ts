import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStoreApi } from "../../services";

export const useDeleteStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idStore: string) => deleteStoreApi(idStore),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-store"],
      });
    },
  });
};
