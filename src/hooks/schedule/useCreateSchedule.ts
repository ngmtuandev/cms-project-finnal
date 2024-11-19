import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScheduleApi } from "../../services";
import { TCreateSchedule } from "../../type/TCreateSchedule";

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createScheduleInfo: TCreateSchedule) =>
      createScheduleApi(createScheduleInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schedule"],
      });
    },
  });
};
