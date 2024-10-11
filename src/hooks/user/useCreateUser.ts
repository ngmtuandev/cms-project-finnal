import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserApi } from "../../services";
import { TCreateUser } from "../../type/TCreateUser";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createUserInfo: TCreateUser) => createUserApi(createUserInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-user"],
      });
    },
  });
};
