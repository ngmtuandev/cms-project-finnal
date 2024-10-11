import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResultApi } from "../../services";
import { TCreateResult } from "../../type/TCreateResult";

export const useCreateResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createResultInfo: TCreateResult) =>
      createResultApi(createResultInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-result"],
      });
    },
  });
};
