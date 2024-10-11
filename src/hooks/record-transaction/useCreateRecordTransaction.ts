import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCreateRecordTransaction } from "../../type/TCreateRecord";
import { postCreateRecordTransaction } from "../../services";
export const useCreateRecordTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createRecordInfo: TCreateRecordTransaction) =>
      postCreateRecordTransaction(createRecordInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["filter-record"],
      });
    },
  });
};
