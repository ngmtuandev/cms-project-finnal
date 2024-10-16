import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMachineApi } from "../../services";
import { TUpdateMachine } from "../../type/TUpdateMachine";

export const useUpdateMachine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateInfo: TUpdateMachine) => updateMachineApi(updateInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-machine"],
      });
    },
  });
};
