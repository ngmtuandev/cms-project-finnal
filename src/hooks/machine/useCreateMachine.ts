import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMachineApi } from "../../services";
import { TCreateMachine } from "../../type/TCreateMachine";

export const useCreateMachine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createMachineInfo: TCreateMachine) =>
      createMachineApi(createMachineInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-machine"],
      });
    },
  });
};
