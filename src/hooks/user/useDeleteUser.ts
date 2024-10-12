import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../../services";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idUser: string) => deleteUserApi(idUser),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-user"],
      });
    },
  });
};
