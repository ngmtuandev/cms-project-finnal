import { useQuery } from "@tanstack/react-query";
import { getSumRecordByResultApi } from "../../services";
import { useRecordByResultStore } from "../../store";

export const useGetSumRecordByResult = () => {
  const { startDate, endDate } = useRecordByResultStore();
  const { data, isLoading } = useQuery({
    queryKey: [startDate, endDate],
    queryFn: () =>
      getSumRecordByResultApi({
        startDate,
        endDate,
      }),
    enabled: true,
  });
  return {
    sumRecordByResult: data?.data?.data,
    isLoading,
  };
};
