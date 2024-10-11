import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStoreApi } from "../../services";
import { TCreateStore } from "../../type/TCreateStore";

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createStoreInfo: TCreateStore) =>
      createStoreApi(createStoreInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-store"],
      });
    },
  });
};
