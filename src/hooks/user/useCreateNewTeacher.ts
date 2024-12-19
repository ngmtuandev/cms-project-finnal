import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTeacherApi } from "../../services";

export const useCreateNewTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createUserInfo: any) => createNewTeacherApi(createUserInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-user"],
      });
    },
  });
};
