import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStoreApi } from "../../services";
import { TUpdateStore } from "../../type/TUpdateStore";

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateInfo: TUpdateStore) => updateStoreApi(updateInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-store"],
      });
    },
  });
};
