import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMachineApi } from "../../services";

export const useDeleteMachine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idMachine: string) => deleteMachineApi(idMachine),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-machine"],
      });
    },
  });
};
